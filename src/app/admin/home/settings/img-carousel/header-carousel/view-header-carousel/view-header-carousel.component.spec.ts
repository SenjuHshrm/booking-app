import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeaderCarouselComponent } from './view-header-carousel.component';

describe('ViewHeaderCarouselComponent', () => {
  let component: ViewHeaderCarouselComponent;
  let fixture: ComponentFixture<ViewHeaderCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHeaderCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHeaderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
