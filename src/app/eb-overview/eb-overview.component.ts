/* tslint:disable:no-console */
import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {EbOverviewService} from './service/eb-overview.service';
import {EpOptionsService} from '../ep-options/service/ep-options.service';
import {OptionsIf} from '../ep-options/data/options.if';
import {SectionIf} from '../ep-options/data/section.if';
import {ThumbsDimIf} from '../ep-options/data/thumbs-dim.if';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-eb-overview',
  templateUrl: './eb-overview.component.html',
  styleUrls: ['./eb-overview.component.scss']
})
export class EbOverviewComponent implements OnInit, AfterViewInit {

  options: OptionsIf;
  section: SectionIf;
  thumbsDims: ThumbsDimIf[];
  dimension: ThumbsDimIf;
  baseDir: string;
  sectionIdx = 0;
  serverAddress = environment.serverAddress;
  itemsPerRow = 1;

  @ViewChild('viewport', {static: true, read: ElementRef}) viewport: ElementRef;

  innerWidth: number;
  list: string[] = [];
  filteredList: string[] = [];
  // private list$: Observable<string[]>;
  private alive = true;


  constructor(
    private readonly overviewService: EbOverviewService,
    private readonly dataService: EpOptionsService
  ) {
  }

  ngOnInit() {
    this.dataService
      .getOptions()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(opt => {
        this.options = opt;
        this.section = this.options.sections[this.sectionIdx];
        this.baseDir = this.section.baseDir;
        this.thumbsDims = this.section.thumbsDims;
        this.dimension = this.thumbsDims[this.section.dimIndex];

        console.info('  > baseDir:', this.baseDir);
        console.info('  > options:', this.options);

        this.overviewService
          .loadList(this.sectionIdx)
          .pipe(
            takeWhile(() => this.alive)
          )
          .subscribe(list => {
            this.list = list;
            this.filteredList = list;
          });
      });
  }

  ngAfterViewInit() {
    this.innerWidth = this.viewport.nativeElement.offsetWidth;
    this.calcItemsPerRow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.calcItemsPerRow();
  }

  getCoverUrl(item: string) {
    const img = item.replace(/\.[a-zA-Z]*$/g, '.jpg');
    return `${this.serverAddress + '/' + this.sectionIdx}/img/${img}`;
  }

  private calcItemsPerRow() {
    if (!this.dimension || !this.innerWidth) {
      return 1;
    }
    this.itemsPerRow = Math.floor(this.innerWidth / this.dimension.width);
  }
}
