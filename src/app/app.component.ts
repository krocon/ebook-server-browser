import {Component, OnDestroy, OnInit} from '@angular/core';
import {EpOptionsService} from './ep-options/service/ep-options.service';
import {takeWhile} from 'rxjs/operators';
import {OptionsIf} from './ep-options/data/options.if';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  options: OptionsIf;
  title = '';
  private alive = true;


  constructor(
    private readonly dataService: EpOptionsService
  ) {
  }

  ngOnInit(): void {
    this.dataService
      .getOptions()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(
        opts => {
          this.title = opts.title;
          this.options = opts;
          console.info('  >', opts);
        }
      );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
