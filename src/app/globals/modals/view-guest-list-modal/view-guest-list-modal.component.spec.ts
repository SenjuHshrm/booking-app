import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestListModalComponent } from './view-guest-list-modal.component';

describe('ViewGuestListModalComponent', () => {
  let component: ViewGuestListModalComponent;
  let fixture: ComponentFixture<ViewGuestListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGuestListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGuestListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
