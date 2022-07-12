import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  illustration: string = '../../assets/illustration.svg';

  constructor() {
  }

  ngOnInit(): void {
  }

  startTutorial(event:any) {
  }
}
