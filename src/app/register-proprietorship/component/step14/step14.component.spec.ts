import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step14Component } from './step14.component';

describe('Step14Component', () => {
  let component: Step14Component;
  let fixture: ComponentFixture<Step14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step14Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
