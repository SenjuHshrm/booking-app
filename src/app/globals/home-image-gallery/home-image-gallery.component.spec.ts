import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImageGalleryComponent } from './home-image-gallery.component';

describe('HomeImageGalleryComponent', () => {
  let component: HomeImageGalleryComponent;
  let fixture: ComponentFixture<HomeImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeImageGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
