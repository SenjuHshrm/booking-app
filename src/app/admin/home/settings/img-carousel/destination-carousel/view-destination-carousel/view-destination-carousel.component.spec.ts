import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDestinationCarouselComponent } from './view-destination-carousel.component';

describe('ViewDestinationCarouselComponent', () => {
  let component: ViewDestinationCarouselComponent;
  let fixture: ComponentFixture<ViewDestinationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDestinationCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDestinationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
