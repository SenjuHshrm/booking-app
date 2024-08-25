import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaqModalComponent } from './create-faq-modal.component';

describe('CreateFaqModalComponent', () => {
  let component: CreateFaqModalComponent;
  let fixture: ComponentFixture<CreateFaqModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFaqModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFaqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
