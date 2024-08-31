import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDestinationCarouselComponent } from './delete-destination-carousel.component';

describe('DeleteDestinationCarouselComponent', () => {
  let component: DeleteDestinationCarouselComponent;
  let fixture: ComponentFixture<DeleteDestinationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDestinationCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDestinationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
