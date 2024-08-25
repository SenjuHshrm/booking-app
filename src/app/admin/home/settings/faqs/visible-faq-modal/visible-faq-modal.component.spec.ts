import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleFaqModalComponent } from './visible-faq-modal.component';

describe('VisibleFaqModalComponent', () => {
  let component: VisibleFaqModalComponent;
  let fixture: ComponentFixture<VisibleFaqModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibleFaqModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibleFaqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
