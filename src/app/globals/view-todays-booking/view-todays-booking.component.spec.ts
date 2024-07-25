import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodaysBookingComponent } from './view-todays-booking.component';

describe('ViewTodaysBookingComponent', () => {
  let component: ViewTodaysBookingComponent;
  let fixture: ComponentFixture<ViewTodaysBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodaysBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTodaysBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
