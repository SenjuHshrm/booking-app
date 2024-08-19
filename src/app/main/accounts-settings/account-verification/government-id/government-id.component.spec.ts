import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentIdComponent } from './government-id.component';

describe('GovernmentIdComponent', () => {
  let component: GovernmentIdComponent;
  let fixture: ComponentFixture<GovernmentIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
