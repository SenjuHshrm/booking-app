import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaycationListComponent } from './staycation-list.component';

describe('StaycationListComponent', () => {
  let component: StaycationListComponent;
  let fixture: ComponentFixture<StaycationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaycationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaycationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
