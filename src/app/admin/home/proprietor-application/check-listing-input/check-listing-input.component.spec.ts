import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListingInputComponent } from './check-listing-input.component';

describe('CheckListingInputComponent', () => {
  let component: CheckListingInputComponent;
  let fixture: ComponentFixture<CheckListingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListingInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckListingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
