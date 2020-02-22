/* tslint:disable:no-console */
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {EbOverviewService} from './service/eb-overview.service';
import {EpOptionsService} from '../ep-options/service/ep-options.service';
import {OptionsIf} from '../ep-options/data/options.if';
import {SectionIf} from '../ep-options/data/section.if';
import {ThumbsDimIf} from '../ep-options/data/thumbs-dim.if';

@Component({
  selector: 'app-eb-overview',
  templateUrl: './eb-overview.component.html',
  styleUrls: ['./eb-overview.component.scss']
})
export class EbOverviewComponent implements OnInit {

  options: OptionsIf;
  section: SectionIf;
  thumbsDims: ThumbsDimIf[];
  dimension: ThumbsDimIf;
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
        this.thumbsDims = this.section.thumbsDims;
        this.dimension = this.thumbsDims[0];

        console.info('  > baseDir:', this.baseDir);
        console.info('  > options:', this.options);

        this.list$ = this.overviewService.loadList(this.sectionIdx);
      });
  }

  getCoverUrl(item: string) {
    const img = item.replace(/\.[a-zA-Z]*$/g, '.jpg');
    return `${this.serverAddress + '/' + this.sectionIdx}/img/${img}`;
  }

}
