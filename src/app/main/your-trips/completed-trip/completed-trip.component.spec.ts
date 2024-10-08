import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTripComponent } from './completed-trip.component';

describe('CompletedTripComponent', () => {
  let component: CompletedTripComponent;
  let fixture: ComponentFixture<CompletedTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
