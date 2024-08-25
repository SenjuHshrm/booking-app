import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFaqModalComponent } from './update-faq-modal.component';

describe('UpdateFaqModalComponent', () => {
  let component: UpdateFaqModalComponent;
  let fixture: ComponentFixture<UpdateFaqModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFaqModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFaqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
