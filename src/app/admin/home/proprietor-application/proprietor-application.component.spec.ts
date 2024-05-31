import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorApplicationComponent } from './proprietor-application.component';

describe('ProprietorApplicationComponent', () => {
  let component: ProprietorApplicationComponent;
  let fixture: ComponentFixture<ProprietorApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietorApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProprietorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
