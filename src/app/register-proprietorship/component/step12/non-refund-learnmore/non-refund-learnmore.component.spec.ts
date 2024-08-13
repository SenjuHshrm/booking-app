import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRefundLearnmoreComponent } from './non-refund-learnmore.component';

describe('NonRefundLearnmoreComponent', () => {
  let component: NonRefundLearnmoreComponent;
  let fixture: ComponentFixture<NonRefundLearnmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonRefundLearnmoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonRefundLearnmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
