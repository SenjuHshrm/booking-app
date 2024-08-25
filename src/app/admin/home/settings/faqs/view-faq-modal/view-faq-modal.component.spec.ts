import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFaqModalComponent } from './view-faq-modal.component';

describe('ViewFaqModalComponent', () => {
  let component: ViewFaqModalComponent;
  let fixture: ComponentFixture<ViewFaqModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFaqModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFaqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
