import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFaqModalComponent } from './delete-faq-modal.component';

describe('DeleteFaqModalComponent', () => {
  let component: DeleteFaqModalComponent;
  let fixture: ComponentFixture<DeleteFaqModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFaqModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFaqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
