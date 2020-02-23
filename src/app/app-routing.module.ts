import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EbOverviewComponent} from './eb-overview/eb-overview.component';
import {EbPageNotFoundComponent} from './eb-page-not-found/eb-page-not-found.component';
import {AppRequestCacheService} from './app.request-cache.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppCachingInterceptor} from './app.caching.interceptor';


const routes: Routes = [
  {path: '', component: EbOverviewComponent},
  {path: 'overview', component: EbOverviewComponent},
  {path: '**', component: EbPageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AppRequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: AppCachingInterceptor, multi: true }
  ]
})
export class AppRoutingModule {
}
