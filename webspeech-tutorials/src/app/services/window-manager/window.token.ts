import {InjectionToken} from "@angular/core";
import {DomPortalOutlet} from "@angular/cdk/portal";

export interface WindowData {
  tabId: string,
  windowTitle: string,
  payload: any
}

export const WINDOW_TAB_DATA = new InjectionToken<WindowData>('POPOUT_MODAL_DATA');

export const WINDOW_TABS: WindowTab[] = [];

export interface WindowTab {
  id: string,
  windowInstance: Window,
  componentInstance: any,
  outlet: DomPortalOutlet
}
