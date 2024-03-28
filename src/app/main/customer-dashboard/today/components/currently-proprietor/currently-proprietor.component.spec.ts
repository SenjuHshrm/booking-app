import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyProprietorComponent } from './currently-proprietor.component';

describe('CurrentlyProprietorComponent', () => {
  let component: CurrentlyProprietorComponent;
  let fixture: ComponentFixture<CurrentlyProprietorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentlyProprietorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentlyProprietorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
