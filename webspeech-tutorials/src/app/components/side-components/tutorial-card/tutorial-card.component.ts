import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tutorial-card',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.css']
})
export class TutorialCardComponent implements OnInit {

  id: number = 1;

  @Input()
  number: string = '01';
  @Input()
  title: string = 'Hallo Welt';
  @Input()
  description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae aliquet in at quis non auctor velit vitae.\n' +
    '      Massa facilisis enim scelerisque nisi est ullamcorper. Vestibulum tristique vel eleifend accumsan';
  @Input()
  status: string = '0';

  @Output()
  onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickCard(event:any) {
    this.onClick.emit(event);
  }
}
