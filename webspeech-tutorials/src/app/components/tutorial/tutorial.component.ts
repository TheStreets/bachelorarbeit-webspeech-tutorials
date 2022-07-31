import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {createHtml} from "../../utils";
import * as ace from "ace-builds";
import 'ace-builds/src-noconflict/ext-language_tools';
import {Ace} from "ace-builds";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons/";

function speakText(text: string) {
  const speaker = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  speaker.speak(utterance);
}

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

  editorOptions = {
    'enableBasicAutocompletion': true,
    'enableLiveAutocompletion': true,
    'enableSnippets': true
  };

  editorTheme: string = 'ace/theme/twilight';
  jsAceEditor!: Ace.Editor;
  htmlAceEditor!: Ace.Editor;


  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.setupEditor();
    // this.iframe.nativeElement.srcdoc = createHtml(this.htmlAceEditor.session.getValue(), this.jsAceEditor.session.getValue());
  }

  speak() {
    speakText('Hallo');
  }

  private setupEditor(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set("basePath", "https://unpkg.com/ace-builds@1.4.12/src-noconflict");

    this.jsAceEditor = ace.edit(this.jsEditor.nativeElement);
    this.jsAceEditor.setOptions(this.editorOptions);
    this.jsAceEditor.setTheme(this.editorTheme);
    this.jsAceEditor.session.setMode('ace/mode/javascript');

    this.htmlAceEditor = ace.edit(this.htmlEditor.nativeElement)
    this.htmlAceEditor.setOptions(this.editorOptions);
    this.htmlAceEditor.setTheme(this.editorTheme);
    this.htmlAceEditor.session.setMode('ace/mode/html');

    this.htmlAceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
  }


}
