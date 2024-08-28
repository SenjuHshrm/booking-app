import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeaderCarouselComponent } from './delete-header-carousel.component';

describe('DeleteHeaderCarouselComponent', () => {
  let component: DeleteHeaderCarouselComponent;
  let fixture: ComponentFixture<DeleteHeaderCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHeaderCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHeaderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
