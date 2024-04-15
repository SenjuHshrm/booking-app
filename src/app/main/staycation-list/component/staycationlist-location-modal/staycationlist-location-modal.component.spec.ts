import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaycationlistLocationModalComponent } from './staycationlist-location-modal.component';

describe('StaycationlistLocationModalComponent', () => {
  let component: StaycationlistLocationModalComponent;
  let fixture: ComponentFixture<StaycationlistLocationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaycationlistLocationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaycationlistLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
