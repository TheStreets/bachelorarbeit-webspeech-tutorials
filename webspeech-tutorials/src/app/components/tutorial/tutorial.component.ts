import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from "ace-builds";
import 'ace-builds/src-noconflict/ext-language_tools';
import {Ace} from "ace-builds";
import {UtilsService} from "../../services/utils.service";
import {EditorData} from "../../models/editor.data.model";


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
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

  constructor(private utilsService: UtilsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.utilsService.editorDataSubject?.subscribe( (editorData) => {
      // setting the iframe content from the editor
      this.iframe.nativeElement.srcdoc = this.utilsService.createTemplate(editorData.html, editorData.js);
    });

    this.setupEditor();

    this.htmlAceEditor.session.setValue(this.utilsService.tutorialData.html);
    this.jsAceEditor.session.setValue(this.utilsService.tutorialData.js);

    // on change event triggered, if someone types in the editor
    this.htmlAceEditor.on('change', () => {
      this.utilsService.editorDataSubject?.next(new EditorData(this.htmlAceEditor.getValue(), this.jsAceEditor.getValue()));
    });
    this.jsAceEditor.on('change', () => {
      this.utilsService.editorDataSubject?.next(new EditorData(this.htmlAceEditor.getValue(), this.jsAceEditor.getValue()));
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
}
