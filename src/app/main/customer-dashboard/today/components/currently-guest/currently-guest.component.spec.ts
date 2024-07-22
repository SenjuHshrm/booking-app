import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyGuestComponent } from './currently-guest.component';

describe('CurrentlyGuestComponent', () => {
  let component: CurrentlyGuestComponent;
  let fixture: ComponentFixture<CurrentlyGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentlyGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentlyGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
