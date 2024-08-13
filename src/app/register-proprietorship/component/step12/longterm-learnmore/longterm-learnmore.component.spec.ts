import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongtermLearnmoreComponent } from './longterm-learnmore.component';

describe('LongtermLearnmoreComponent', () => {
  let component: LongtermLearnmoreComponent;
  let fixture: ComponentFixture<LongtermLearnmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongtermLearnmoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongtermLearnmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
