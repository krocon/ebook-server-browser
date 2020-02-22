import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EbOverviewComponent} from './eb-overview.component';

describe('EbOverviewComponent', () => {
  let component: EbOverviewComponent;
  let fixture: ComponentFixture<EbOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EbOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
