import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersAddguestComponent } from './search-filters-addguest.component';

describe('SearchFiltersAddguestComponent', () => {
  let component: SearchFiltersAddguestComponent;
  let fixture: ComponentFixture<SearchFiltersAddguestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFiltersAddguestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersAddguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
