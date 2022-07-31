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

  menuIcon = faWindowClose;
  isOpen: boolean = true;

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

  openMenu() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.menuIcon = faWindowClose : this.menuIcon = faBars;
  }


}
