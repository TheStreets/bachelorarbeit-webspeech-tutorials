import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-name-the-bot',
  templateUrl: './name-the-bot.component.html',
  styleUrls: ['./name-the-bot.component.css']
})
export class NameTheBotComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  handleButtonClick(event: any, name: string) {
    event.preventDefault();
    console.log("Name:" + name);
  }
}
