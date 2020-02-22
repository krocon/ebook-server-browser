import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-eb-nav',
  templateUrl: './eb-nav.component.html',
  styleUrls: ['./eb-nav.component.scss']
})
export class EbNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 2048px)')
    // .observe(Breakpoints.Handset)
    // .observe(Breakpoints.TabletLandscape)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

}
