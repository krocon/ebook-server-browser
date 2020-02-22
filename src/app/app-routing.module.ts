import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EbOverviewComponent} from './eb-overview/eb-overview.component';
import {EbPageNotFoundComponent} from './eb-page-not-found/eb-page-not-found.component';


const routes: Routes = [
  {path: '', component: EbOverviewComponent},
  {path: 'overview', component: EbOverviewComponent},
  {path: '**', component: EbPageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
