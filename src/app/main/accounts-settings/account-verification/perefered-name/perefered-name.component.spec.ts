import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PereferedNameComponent } from './perefered-name.component';

describe('PereferedNameComponent', () => {
  let component: PereferedNameComponent;
  let fixture: ComponentFixture<PereferedNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PereferedNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PereferedNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
