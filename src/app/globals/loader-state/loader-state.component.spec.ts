import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderStateComponent } from './loader-state.component';

describe('LoaderStateComponent', () => {
  let component: LoaderStateComponent;
  let fixture: ComponentFixture<LoaderStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
