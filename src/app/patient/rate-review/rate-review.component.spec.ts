import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateReviewComponent } from './rate-review.component';

describe('RateReviewComponent', () => {
  let component: RateReviewComponent;
  let fixture: ComponentFixture<RateReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
