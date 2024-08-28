import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeaderCarouselComponent } from './create-header-carousel.component';

describe('CreateHeaderCarouselComponent', () => {
  let component: CreateHeaderCarouselComponent;
  let fixture: ComponentFixture<CreateHeaderCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHeaderCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHeaderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
