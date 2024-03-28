import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStaycationComponent } from './book-staycation.component';

describe('BookStaycationComponent', () => {
  let component: BookStaycationComponent;
  let fixture: ComponentFixture<BookStaycationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookStaycationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookStaycationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
