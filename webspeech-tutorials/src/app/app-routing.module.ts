import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {NameTheBotComponent} from "./components/name-the-bot/name-the-bot.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {TableOfContentsComponent} from "./components/table-of-contents/table-of-contents.component";

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'bot-name', component: NameTheBotComponent},
  {path: 'table-of-contents', component: TableOfContentsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
