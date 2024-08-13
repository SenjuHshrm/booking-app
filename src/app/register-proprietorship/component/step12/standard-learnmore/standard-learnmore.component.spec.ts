import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardLearnmoreComponent } from './standard-learnmore.component';

describe('StandardLearnmoreComponent', () => {
  let component: StandardLearnmoreComponent;
  let fixture: ComponentFixture<StandardLearnmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardLearnmoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardLearnmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
