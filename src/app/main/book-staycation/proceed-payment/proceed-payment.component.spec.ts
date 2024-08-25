import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedPaymentComponent } from './proceed-payment.component';

describe('ProceedPaymentComponent', () => {
  let component: ProceedPaymentComponent;
  let fixture: ComponentFixture<ProceedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
