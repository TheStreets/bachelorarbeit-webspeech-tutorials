import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  hciLogo: string = '../../assets/hci_logo.svg';
  luhLogo: string = '../../assets/luh_logo.svg';
  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
