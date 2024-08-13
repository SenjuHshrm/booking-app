import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEarningComponent } from './host-earning.component';

describe('HostEarningComponent', () => {
  let component: HostEarningComponent;
  let fixture: ComponentFixture<HostEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostEarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
