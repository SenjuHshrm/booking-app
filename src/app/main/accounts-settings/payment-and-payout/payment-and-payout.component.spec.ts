import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndPayoutComponent } from './payment-and-payout.component';

describe('PaymentAndPayoutComponent', () => {
  let component: PaymentAndPayoutComponent;
  let fixture: ComponentFixture<PaymentAndPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAndPayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAndPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
