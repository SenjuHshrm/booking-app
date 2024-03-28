import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaycationDetailsComponent } from './staycation-details.component';

describe('StaycationDetailsComponent', () => {
  let component: StaycationDetailsComponent;
  let fixture: ComponentFixture<StaycationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaycationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaycationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
