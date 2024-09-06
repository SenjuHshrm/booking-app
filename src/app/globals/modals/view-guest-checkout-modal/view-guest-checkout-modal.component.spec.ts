import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestCheckoutModalComponent } from './view-guest-checkout-modal.component';

describe('ViewGuestCheckoutModalComponent', () => {
  let component: ViewGuestCheckoutModalComponent;
  let fixture: ComponentFixture<ViewGuestCheckoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGuestCheckoutModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGuestCheckoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
