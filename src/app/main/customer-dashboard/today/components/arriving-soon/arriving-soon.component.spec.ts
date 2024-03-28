import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivingSoonComponent } from './arriving-soon.component';

describe('ArrivingSoonComponent', () => {
  let component: ArrivingSoonComponent;
  let fixture: ComponentFixture<ArrivingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivingSoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
