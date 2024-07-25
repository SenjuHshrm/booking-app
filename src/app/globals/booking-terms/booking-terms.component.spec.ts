import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTermsComponent } from './booking-terms.component';

describe('BookingTermsComponent', () => {
  let component: BookingTermsComponent;
  let fixture: ComponentFixture<BookingTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTermsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
