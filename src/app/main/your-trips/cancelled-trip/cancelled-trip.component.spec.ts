import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTripComponent } from './cancelled-trip.component';

describe('CancelledTripComponent', () => {
  let component: CancelledTripComponent;
  let fixture: ComponentFixture<CancelledTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
