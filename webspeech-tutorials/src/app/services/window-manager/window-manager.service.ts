import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  OnDestroy,
  Type
} from '@angular/core';
import {ComponentPortal, DomPortalOutlet, PortalInjector} from "@angular/cdk/portal";
import {WINDOW_TAB_DATA, WINDOW_TABS, WindowData, WindowTab} from "./window.token";

@Injectable({
  providedIn: 'root'
})
export class WindowManagerService implements OnDestroy {

  styleSheetElement!: HTMLLinkElement;

  constructor(private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver,
              private applicationRef: ApplicationRef) {
  }

  openOrFocusWindowTab<T>(component: Type<T>, windowData: WindowData, isSame?: (component: any) => boolean): void {
    if (!this.isWindowTabOpen(windowData.tabId)) {
      console.log(`Opening new tab for ${windowData.tabId}`);
      this.openWindowTab(component, windowData);
    } else {
      console.log(`Using existing tab for ${windowData.tabId}`);
      const existingTab = this.getWindowTab(windowData.tabId);
      const shouldReload = isSame ? !isSame(existingTab.componentInstance) : true;

      if (shouldReload) {
        existingTab.outlet.detach();
        const injector = this.createInjector(windowData);
        existingTab.componentInstance = this.attachContainer(component, existingTab.outlet, injector);
      }
      this.focusWindowTab(windowData.tabId);
    }
  }

  createInjectionData<T>(tabId: string, windowTitle: string, payload: T): WindowData {
    return {
      tabId: tabId,
      windowTitle: windowTitle,
      payload: payload
    };
  }

  closeWindowTabs(): void {
    WINDOW_TABS.forEach((tab: WindowTab) => {
      if (tab.windowInstance) {
        tab.windowInstance.close();
      }
    });
    WINDOW_TABS.splice(0, WINDOW_TABS.length);
  }

  private openWindowTab<T>(component: Type<T>, data: WindowData): void {
    const windowInstance = this.openOnce(
      'assets/templates/iframe-template.html',
      data.tabId
    );
    // Wait for window instance to be created
    if(windowInstance) {
      setTimeout(() => {
        this.createCDKPortal(component, data, windowInstance);
      }, 300);
    }
    throw new Error('WindowInstance is Null');
  }

  private getWindowTab(id: string): WindowTab {
    const index = WINDOW_TABS.findIndex((tab: WindowTab) => tab.id === id);
    return WINDOW_TABS[index];
  }

  private isWindowTabCreated(id: string): boolean {
    return WINDOW_TABS.some((tab: WindowTab) => tab.id === id);
  }

  private createInjector(data: WindowData): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(WINDOW_TAB_DATA, data);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private attachContainer<T>(component: Type<T>, outlet: DomPortalOutlet, injector: PortalInjector): T {
    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  private isWindowTabOpen(id: string): boolean {
    const tab = this.getWindowTab(id);
    return tab && tab.windowInstance && !tab.windowInstance.closed;
  }

  private focusWindowTab(id: string): void {
    this.getWindowTab(id).windowInstance.focus();
  }

  private openOnce(url: string, target: string): Window | null {
    // open a blank "target" windowInstance
    // or gtet the reference to the existing "target" window
    const winRef = window.open('', target, '');
    // if the "target" window was just opened, change its url
    if (winRef != null) {
      if (winRef.location.href === 'about:blank') {
        winRef.location.href = url;
      }
      return winRef;
    }
    return null;
  }

  private createCDKPortal<T>(component: Type<T>, data: WindowData, windowInstance: Window): void {
    console.log(`Creating portal for ${data.tabId}`);
    if (windowInstance) {
      windowInstance.document.body.innerText = '';
      // Create a portal outlet with the body of the new window document
      const outlet = new DomPortalOutlet(windowInstance.document.body, this.componentFactoryResolver, this.applicationRef, this.injector);

      // Copy styles from parent window
      document.querySelectorAll('style').forEach(htmlElement => {
        windowInstance.document.head.appendChild(htmlElement.cloneNode(true));
      });
      // Copy stylesheet link from parent windowInstance
      this.styleSheetElement = this.getStyleSheetElement();
      windowInstance.document.head.appendChild(this.styleSheetElement);

      this.styleSheetElement.onload = () => {
        console.log('Loading stylesheet');
        // Clear tab content
        windowInstance.document.body.innerText = '';

        // Create an injector with window data
        const injector = this.createInjector(data);

        // Attach the Portal
        windowInstance.document.title = data.windowTitle;
        const componentInstance = this.attachContainer(component, outlet, injector);

        if (this.isWindowTabCreated(data.tabId)) {
          const tab = this.getWindowTab(data.tabId);
          tab.windowInstance = windowInstance;
          tab.componentInstance = componentInstance;
          tab.outlet = outlet;
        } else {
          WINDOW_TABS.push({
            id: data.tabId,
            windowInstance: windowInstance,
            componentInstance: componentInstance,
            outlet: outlet
          });
        }
      };
    }
  }

  private getStyleSheetElement(): HTMLLinkElement {
    const styleSheetElement = document.createElement('link');
    document.querySelectorAll('link').forEach(htmlElement => {
      if (htmlElement.rel === 'stylesheet') {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = 'stylesheet';
        styleSheetElement.href = absoluteUrl;
      }
    });
    return styleSheetElement;
  }

  ngOnDestroy(): void {
  }
}
