import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMessageHostComponent } from './trip-message-host.component';

describe('TripMessageHostComponent', () => {
  let component: TripMessageHostComponent;
  let fixture: ComponentFixture<TripMessageHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripMessageHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripMessageHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
