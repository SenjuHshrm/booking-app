import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTripsModalComponent } from './validation-trips-modal.component';

describe('ValidationTripsModalComponent', () => {
  let component: ValidationTripsModalComponent;
  let fixture: ComponentFixture<ValidationTripsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationTripsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationTripsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
