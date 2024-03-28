import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReviewComponent } from './pending-review.component';

describe('PendingReviewComponent', () => {
  let component: PendingReviewComponent;
  let fixture: ComponentFixture<PendingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
