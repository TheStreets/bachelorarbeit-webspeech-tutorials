import { Component, OnInit } from '@angular/core';
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  menuIcon = faWindowClose;
  isOpen: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.menuIcon = faWindowClose : this.menuIcon = faBars;
  }

}
