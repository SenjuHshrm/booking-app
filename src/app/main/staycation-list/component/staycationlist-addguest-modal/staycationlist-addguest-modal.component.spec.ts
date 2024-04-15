import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaycationlistAddguestModalComponent } from './staycationlist-addguest-modal.component';

describe('StaycationlistAddguestModalComponent', () => {
  let component: StaycationlistAddguestModalComponent;
  let fixture: ComponentFixture<StaycationlistAddguestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaycationlistAddguestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaycationlistAddguestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
