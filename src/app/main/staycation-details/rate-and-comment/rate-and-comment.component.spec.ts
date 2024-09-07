import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAndCommentComponent } from './rate-and-comment.component';

describe('RateAndCommentComponent', () => {
  let component: RateAndCommentComponent;
  let fixture: ComponentFixture<RateAndCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateAndCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateAndCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
