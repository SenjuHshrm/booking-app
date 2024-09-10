import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtripsReservationModalComponent } from './viewtrips-reservation-modal.component';

describe('ViewtripsReservationModalComponent', () => {
  let component: ViewtripsReservationModalComponent;
  let fixture: ComponentFixture<ViewtripsReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtripsReservationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtripsReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
