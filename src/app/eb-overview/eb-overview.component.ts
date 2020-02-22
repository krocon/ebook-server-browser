import {Component, OnInit} from '@angular/core';
import {EbOverviewService} from './service/eb-overview.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-eb-overview',
  templateUrl: './eb-overview.component.html',
  styleUrls: ['./eb-overview.component.scss']
})
export class EbOverviewComponent implements OnInit {

  // options: OptionsIf;
  sectionIdx = 0;
  private list$: Observable<string[]>;

  constructor(
    private readonly overviewService: EbOverviewService,
    // private readonly dataService: EpOptionsService
  ) {
  }

  ngOnInit() {
    // this.dataService
    //   .getOptions()
    //   .subscribe(opt => {
    //     this.options = opt;
    //     const baseDir = this.options.sections[this.sectionIdx].baseDir;
    //     console.info('  > baseDir:', baseDir);

        this.list$ = this.overviewService.loadList(this.sectionIdx);
      // });
  }

}
