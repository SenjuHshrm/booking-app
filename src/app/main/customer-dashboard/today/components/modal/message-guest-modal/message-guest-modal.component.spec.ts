import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGuestModalComponent } from './message-guest-modal.component';

describe('MessageGuestModalComponent', () => {
  let component: MessageGuestModalComponent;
  let fixture: ComponentFixture<MessageGuestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageGuestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageGuestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
