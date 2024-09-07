import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTripComponent } from './pending-trip.component';

describe('PendingTripComponent', () => {
  let component: PendingTripComponent;
  let fixture: ComponentFixture<PendingTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
