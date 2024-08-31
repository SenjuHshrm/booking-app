import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingApplicationComponent } from './listing-application.component';

describe('ListingApplicationComponent', () => {
  let component: ListingApplicationComponent;
  let fixture: ComponentFixture<ListingApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
