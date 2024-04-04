import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersLocationsComponent } from './search-filters-locations.component';

describe('SearchFiltersLocationsComponent', () => {
  let component: SearchFiltersLocationsComponent;
  let fixture: ComponentFixture<SearchFiltersLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFiltersLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
