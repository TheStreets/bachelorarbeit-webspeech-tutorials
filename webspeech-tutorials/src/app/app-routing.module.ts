import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {TableOfContentsComponent} from "./components/table-of-contents/table-of-contents.component";
import {TutorialComponent} from "./components/tutorial/tutorial.component";

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'table-of-contents', component: TableOfContentsComponent},
  {path: 'tutorials/:id', component: TutorialComponent},
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
