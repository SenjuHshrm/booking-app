import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDestinationCarouselComponent } from './update-destination-carousel.component';

describe('UpdateDestinationCarouselComponent', () => {
  let component: UpdateDestinationCarouselComponent;
  let fixture: ComponentFixture<UpdateDestinationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDestinationCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDestinationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
