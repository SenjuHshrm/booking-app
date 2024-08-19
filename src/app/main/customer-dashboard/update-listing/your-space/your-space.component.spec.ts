import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSpaceComponent } from './your-space.component';

describe('YourSpaceComponent', () => {
  let component: YourSpaceComponent;
  let fixture: ComponentFixture<YourSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
