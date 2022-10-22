import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {UtilService} from "../../services/util.service";
import {WindowManagerService} from "../../services/window-manager/window-manager.service";
import {WINDOW_TAB_DATA, WindowData} from "../../services/window-manager/window.token";
import {EditorData} from "../../models/editor.data.model";

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements AfterViewInit {

  @ViewChild('output')
  private iframe!: ElementRef<HTMLIFrameElement>;
  private data!: EditorData;

  constructor(@Inject(WINDOW_TAB_DATA) data: WindowData, private utilService:UtilService, private windowManager: WindowManagerService) {
    this.data = data.payload as EditorData;
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.srcdoc = this.utilService.createTemplate(this.data.html, this.data.js);
  }

}
