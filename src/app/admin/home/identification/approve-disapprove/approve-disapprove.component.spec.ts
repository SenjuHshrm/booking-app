import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDisapproveComponent } from './approve-disapprove.component';

describe('ApproveDisapproveComponent', () => {
  let component: ApproveDisapproveComponent;
  let fixture: ComponentFixture<ApproveDisapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDisapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveDisapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
