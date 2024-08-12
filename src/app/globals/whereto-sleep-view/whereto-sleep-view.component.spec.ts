import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheretoSleepViewComponent } from './whereto-sleep-view.component';

describe('WheretoSleepViewComponent', () => {
  let component: WheretoSleepViewComponent;
  let fixture: ComponentFixture<WheretoSleepViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheretoSleepViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheretoSleepViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
