import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressTripComponent } from './in-progress-trip.component';

describe('InProgressTripComponent', () => {
  let component: InProgressTripComponent;
  let fixture: ComponentFixture<InProgressTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
