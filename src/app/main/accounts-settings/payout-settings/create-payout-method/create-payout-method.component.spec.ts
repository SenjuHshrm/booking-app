import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayoutMethodComponent } from './create-payout-method.component';

describe('CreatePayoutMethodComponent', () => {
  let component: CreatePayoutMethodComponent;
  let fixture: ComponentFixture<CreatePayoutMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePayoutMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePayoutMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
