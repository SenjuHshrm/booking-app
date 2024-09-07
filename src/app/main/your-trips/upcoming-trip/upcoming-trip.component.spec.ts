import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTripComponent } from './upcoming-trip.component';

describe('UpcomingTripComponent', () => {
  let component: UpcomingTripComponent;
  let fixture: ComponentFixture<UpcomingTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
