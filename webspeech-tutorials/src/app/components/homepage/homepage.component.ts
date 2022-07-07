import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  hciLogo: string = '../../assets/hci_logo.svg';
  luhLogo: string = '../../assets/luh_logo.svg';
  illustration: string = '../../assets/illustration.svg';

  constructor() {
  }

  ngOnInit(): void {
  }

}
