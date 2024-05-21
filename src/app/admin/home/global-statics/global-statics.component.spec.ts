import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStaticsComponent } from './global-statics.component';

describe('GlobalStaticsComponent', () => {
  let component: GlobalStaticsComponent;
  let fixture: ComponentFixture<GlobalStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalStaticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
