import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {NavbarComponent} from './components/side-components/navbar/navbar.component';
import {NameTheBotComponent} from './components/name-the-bot/name-the-bot.component';
import {FormsModule} from "@angular/forms";
import {CtaButtonComponent} from './components/side-components/cta-button/cta-button.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TableOfContentsComponent} from './components/table-of-contents/table-of-contents.component';
import {TutorialCardComponent} from './components/side-components/tutorial-card/tutorial-card.component';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./services/data.service";
import {TutorialComponent} from './components/tutorial/tutorial.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    NameTheBotComponent,
    CtaButtonComponent,
    PageNotFoundComponent,
    TableOfContentsComponent,
    TutorialCardComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
