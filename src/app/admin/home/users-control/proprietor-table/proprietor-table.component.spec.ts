import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorTableComponent } from './proprietor-table.component';

describe('ProprietorTableComponent', () => {
  let component: ProprietorTableComponent;
  let fixture: ComponentFixture<ProprietorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietorTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProprietorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
