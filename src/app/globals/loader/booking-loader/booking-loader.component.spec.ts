import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingLoaderComponent } from './booking-loader.component';

describe('BookingLoaderComponent', () => {
  let component: BookingLoaderComponent;
  let fixture: ComponentFixture<BookingLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
