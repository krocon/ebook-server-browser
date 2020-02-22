import {Component, OnInit} from '@angular/core';
import {EbOverviewService} from './service/eb-overview.service';
import {Observable} from 'rxjs';
import {EpOptionsService} from '../ep-options/service/ep-options.service';
import {OptionsIf} from '../ep-options/data/options.if';
import {SectionIf} from '../ep-options/data/section.if';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-eb-overview',
  templateUrl: './eb-overview.component.html',
  styleUrls: ['./eb-overview.component.scss']
})
export class EbOverviewComponent implements OnInit {

  options: OptionsIf;
  section: SectionIf;
  baseDir: string;
  sectionIdx = 0;
  serverAddress = environment.serverAddress;

  private list$: Observable<string[]>;

  constructor(
    private readonly overviewService: EbOverviewService,
    private readonly dataService: EpOptionsService
  ) {
  }

  ngOnInit() {
    this.dataService
      .getOptions()
      .subscribe(opt => {
        this.options = opt;
        this.section = this.options.sections[this.sectionIdx];
        this.baseDir = this.section.baseDir;
        // tslint:disable-next-line:no-console
        console.info('  > baseDir:', this.baseDir);

        this.list$ = this.overviewService.loadList(this.sectionIdx);
      });
  }

  getCoverUrl(item: string) {
    const img = item.replace(/\.[a-zA-Z]*$/g, '.jpg');
    return `${this.serverAddress + '/' + this.sectionIdx}/img/${img}`;
  }

}
