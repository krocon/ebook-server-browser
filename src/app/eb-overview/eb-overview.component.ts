import {Component, OnInit} from '@angular/core';
import {EbOverviewService} from './eb-overview.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-eb-overview',
  templateUrl: './eb-overview.component.html',
  styleUrls: ['./eb-overview.component.scss']
})
export class EbOverviewComponent implements OnInit {

  private list$: Observable<string[]>;

  constructor(private readonly overviewService: EbOverviewService) {
  }

  ngOnInit() {
    this.list$ = this.overviewService.loadList();
  }

}
