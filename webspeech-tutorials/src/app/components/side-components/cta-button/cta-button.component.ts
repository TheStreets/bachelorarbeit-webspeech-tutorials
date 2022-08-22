import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cta-button',
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.scss']
})
export class CtaButtonComponent implements OnInit {
  @Input()
  displayText:string = '';

  @Input()
  link:string = '';

  @Output()
  onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(event:any) {
    event.preventDefault();
    this.onClick.emit(event);
  }
}
