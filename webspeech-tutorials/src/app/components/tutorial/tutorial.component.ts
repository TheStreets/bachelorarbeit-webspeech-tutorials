import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from "ace-builds";
import 'ace-builds/src-noconflict/ext-language_tools';
import {Ace} from "ace-builds";
import {UtilService} from "../../services/util.service";
import {EditorData} from "../../models/editor.data.model";
import {ActivatedRoute} from "@angular/router";
import {WindowManagerService} from "../../services/window-manager/window-manager.service";
import {IframeComponent} from "../iframe/iframe.component";
import {TestComponent} from "../test/test.component";


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit, AfterViewInit {

  @ViewChild('output')
  private iframe!: ElementRef<HTMLIFrameElement>;

  @ViewChild("jsEditor")
  private jsEditor!: ElementRef<HTMLElement>;

  @ViewChild("htmlEditor")
  private htmlEditor!: ElementRef<HTMLElement>;

  sizeTopLeft: number = 50;
  sizeTopRight: number = 50;
  sizes = {
    percent: {
      area_1: 50,
      area_2: 50
    }
  }
  gutterSizeVertical: number = 10;

  editorOptions = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,

  };

  editorTheme: string = 'ace/theme/cobalt';
  jsAceEditor!: Ace.Editor;
  htmlAceEditor!: Ace.Editor;
  tutorialId!: string | null;

  constructor(private utilService: UtilService, private activatedRoute: ActivatedRoute,
              private windowManager: WindowManagerService) {
    this.tutorialId = activatedRoute.snapshot.paramMap.get('id');
    this.utilService.displayTutorial(parseInt(this.tutorialId!));
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.utilService.editorDataSubject?.subscribe((editorData) => {
      // setting the iframe content from the editor
      // this.iframe.nativeElement.srcdoc = this.utilService.createTemplate(editorData.html, editorData.js);
      console.log('updating data');
      this.openOrUpdateTabData(editorData);
    });

    this.setupEditor();

    this.htmlAceEditor.session.setValue(this.utilService.tutorialData.html);
    this.jsAceEditor.session.setValue(this.utilService.tutorialData.js);

    // on change event triggered, if someone types in the editor
    this.htmlAceEditor.on('change', () => {
      this.utilService.editorDataSubject?.next(new EditorData(this.htmlAceEditor.getValue(), this.jsAceEditor.getValue()));
    });
    this.jsAceEditor.on('change', () => {
      this.utilService.editorDataSubject?.next(new EditorData(this.htmlAceEditor.getValue(), this.jsAceEditor.getValue()));
    });
  }

  private setupEditor(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set("basePath", "https://unpkg.com/ace-builds@1.4.12/src-noconflict");

    this.jsAceEditor = ace.edit(this.jsEditor.nativeElement, {selectionStyle: "text"});
    this.jsAceEditor.setOptions(this.editorOptions);
    this.jsAceEditor.setTheme(this.editorTheme);
    this.jsAceEditor.session.setMode('ace/mode/javascript');

    this.htmlAceEditor = ace.edit(this.htmlEditor.nativeElement, {selectionStyle: "text"})
    this.htmlAceEditor.setOptions(this.editorOptions);
    this.htmlAceEditor.setTheme(this.editorTheme);
    this.htmlAceEditor.session.setMode('ace/mode/html');

  }

  /**
   * on the first time the function is called, the tab is opened, on the second, third ... times,
   * the tab gets new data
   * */
  openOrUpdateTabData(editorData: EditorData) {
    const data = this.windowManager.createInjectionData<EditorData>(
      `${this.tutorialId}`, 'Tutorial ' + this.tutorialId, editorData);
    this.windowManager.openOrFocusWindowTab(IframeComponent, data, component => false);
  }
}
