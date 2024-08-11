import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageProprietorComponent } from './message-proprietor.component';

describe('MessageProprietorComponent', () => {
  let component: MessageProprietorComponent;
  let fixture: ComponentFixture<MessageProprietorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageProprietorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageProprietorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
