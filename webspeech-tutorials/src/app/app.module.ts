import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {NavbarComponent} from './components/side-components/navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import {CtaButtonComponent} from './components/side-components/cta-button/cta-button.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TableOfContentsComponent} from './components/table-of-contents/table-of-contents.component';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./services/data.service";
import {TutorialComponent} from './components/tutorial/tutorial.component';
import {SideMenuComponent} from './components/side-components/side-menu/side-menu.component';
import {AngularSplitModule} from "angular-split";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    CtaButtonComponent,
    PageNotFoundComponent,
    TableOfContentsComponent,
    TutorialComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSplitModule,
    NgbModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
