import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNameComponent } from './legal-name.component';

describe('LegalNameComponent', () => {
  let component: LegalNameComponent;
  let fixture: ComponentFixture<LegalNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
