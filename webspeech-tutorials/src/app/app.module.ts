import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {NavbarComponent} from './components/side-components/navbar/navbar.component';
import {NameTheBotComponent} from './components/name-the-bot/name-the-bot.component';
import {FormsModule} from "@angular/forms";
import { CtaButtonComponent } from './components/side-components/cta-button/cta-button.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    NameTheBotComponent,
    CtaButtonComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
