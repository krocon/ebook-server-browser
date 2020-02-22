import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EbPageNotFoundComponent} from './eb-page-not-found.component';

describe('EbPageNotFoundComponent', () => {
  let component: EbPageNotFoundComponent;
  let fixture: ComponentFixture<EbPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EbPageNotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
