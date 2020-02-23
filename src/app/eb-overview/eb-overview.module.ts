import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EbOverviewComponent} from './eb-overview.component';
import {EbOverviewService} from './service/eb-overview.service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {EpOptionsModule} from '../ep-options/ep-options.module';
import {MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    EbOverviewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ScrollingModule,
    MatSelectModule,
    MatInputModule,
    EpOptionsModule,
    FormsModule
  ],
  providers: [
    EbOverviewService
  ]
})
export class EbOverviewModule {
}
