import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";
import {Tutorial} from "../../models/tutorial-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss']
})
export class TableOfContentsComponent implements OnInit, OnDestroy {

  constructor(private routerService: Router) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
  }

  navigateToTutorial(id: number): void {
    this.routerService.navigate(['tutorials', id]);
  }
}
