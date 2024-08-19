import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalGuideComponent } from './arrival-guide.component';

describe('ArrivalGuideComponent', () => {
  let component: ArrivalGuideComponent;
  let fixture: ComponentFixture<ArrivalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
