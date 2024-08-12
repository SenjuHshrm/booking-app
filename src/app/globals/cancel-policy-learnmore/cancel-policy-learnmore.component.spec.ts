import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPolicyLearnmoreComponent } from './cancel-policy-learnmore.component';

describe('CancelPolicyLearnmoreComponent', () => {
  let component: CancelPolicyLearnmoreComponent;
  let fixture: ComponentFixture<CancelPolicyLearnmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelPolicyLearnmoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelPolicyLearnmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
