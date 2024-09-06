import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCheckinModalComponent } from './view-checkin-modal.component';

describe('ViewCheckinModalComponent', () => {
  let component: ViewCheckinModalComponent;
  let fixture: ComponentFixture<ViewCheckinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCheckinModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCheckinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
