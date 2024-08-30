import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDestinationCarouselComponent } from './create-destination-carousel.component';

describe('CreateDestinationCarouselComponent', () => {
  let component: CreateDestinationCarouselComponent;
  let fixture: ComponentFixture<CreateDestinationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDestinationCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDestinationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
