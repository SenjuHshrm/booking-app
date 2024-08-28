import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHeaderCarouselComponent } from './update-header-carousel.component';

describe('UpdateHeaderCarouselComponent', () => {
  let component: UpdateHeaderCarouselComponent;
  let fixture: ComponentFixture<UpdateHeaderCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHeaderCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHeaderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
