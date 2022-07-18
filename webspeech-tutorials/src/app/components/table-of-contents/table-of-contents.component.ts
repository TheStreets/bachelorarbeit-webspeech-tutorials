import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";
import {Tutorial} from "../../models/tutorial-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.css']
})
export class TableOfContentsComponent implements OnInit, OnDestroy {

  bluePerson: string = '../../assets/person_blue.svg'
  redPerson: string = '../../assets/person_red.svg'
  tutorials: Tutorial[] = [];
  private _subscription: Subscription = new Subscription();

  constructor(private _dataService: DataService, private routerService: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._subscription = this._dataService.getTutorials().subscribe(data => {
      this.tutorials = data;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  handleNavigation(id: number) {
    this.routerService.navigate(['tutorials', id])
  }

}
