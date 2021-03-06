/* tslint:disable:no-console */
import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {EbOverviewService} from './service/eb-overview.service';
import {EpOptionsService} from '../ep-options/service/ep-options.service';
import {OptionsIf} from '../ep-options/data/options.if';
import {SectionIf} from '../ep-options/data/section.if';
import {ThumbsDimIf} from '../ep-options/data/thumbs-dim.if';
import {debounceTime, distinctUntilChanged, takeWhile, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-eb-overview',
  templateUrl: './eb-overview.component.html',
  styleUrls: ['./eb-overview.component.scss']
})
export class EbOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  options: OptionsIf;
  section: SectionIf;
  thumbsDims: ThumbsDimIf[];
  dimension: ThumbsDimIf;
  baseDir: string;
  sectionIdx = 0;
  serverAddress = environment.serverAddress;
  itemsPerRow = 1;
  filterText = '';

  @ViewChild('viewport', {static: true, read: ElementRef}) viewport: ElementRef;
  @ViewChild('filter', {static: true, read: ElementRef}) filter: ElementRef;

  innerWidth: number;
  list: string[] = [];
  filteredList: string[] = [];
  filteredDummyList: string[][] = [];
  loading = false;

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
        this.initSection();
        console.info('  > baseDir:', this.baseDir);
        console.info('  > options:', this.options);
      });
  }

  ngAfterViewInit() {
    this.innerWidth = this.viewport.nativeElement.offsetWidth;
    this.calcItemsPerRow();

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(333),
        distinctUntilChanged(),
        tap(() => {
          this.applyFilter(this.filter.nativeElement.value);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  applyFilter(text: string) {
    text = text.trim().toLowerCase();
    this.filteredList = this.list.filter(s => s.toLowerCase().indexOf(text) > -1);
    this.calcItemsPerRow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.calcItemsPerRow();
  }

  initSection() {
    this.section = this.options.sections[this.sectionIdx];
    this.baseDir = this.section.baseDir;
    this.thumbsDims = this.section.thumbsDims;
    this.filterText = this.section.initialFilter;
    this.dimension = this.thumbsDims[this.section.dimIndex];

    this.loading = true;

    setTimeout(() => {
      this.overviewService
        .loadList(this.sectionIdx)
        .pipe(
          takeWhile(() => this.alive)
        )
        .subscribe(list => {
          this.list = list;
          this.loading = false;
          this.applyFilter(this.filterText);
        });
    }, 500);
  }

  setSection(idx: number) {
    this.sectionIdx = idx;
    this.filteredList = [];
    this.initSection();
  }

  getCoverUrl(item: string) {
    const img = item.replace(/\.[a-zA-Z]*$/g, '.jpg');
    return `${this.serverAddress + '/' + this.sectionIdx}/img/${img}`;
  }

  private calcItemsPerRow() {
    if (!this.dimension || !this.innerWidth) {
      this.itemsPerRow = 1;
    } else {
      this.itemsPerRow = Math.floor(this.innerWidth / this.dimension.width);
    }
    const rowCount = Math.round(0.5 + (this.filteredList.length ? this.filteredList.length / this.itemsPerRow : 0));
    this.filteredDummyList = new Array(rowCount)
      .fill(1)
      .map((v, i) => {
        const arr = [];
        for (let j = 0; j < this.itemsPerRow; j++) {
          const k = i * this.itemsPerRow + j;
          if (k < this.filteredList.length) {
            arr.push(this.filteredList[k]);
          }
        }
        return arr;
      });
  }

}
