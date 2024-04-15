import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWalletSettingsComponent } from './payment-wallet-settings.component';

describe('PaymentWalletSettingsComponent', () => {
  let component: PaymentWalletSettingsComponent;
  let fixture: ComponentFixture<PaymentWalletSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWalletSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentWalletSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
