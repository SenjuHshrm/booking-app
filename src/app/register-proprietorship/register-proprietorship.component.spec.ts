import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProprietorshipComponent } from './register-proprietorship.component';

describe('RegisterProprietorshipComponent', () => {
  let component: RegisterProprietorshipComponent;
  let fixture: ComponentFixture<RegisterProprietorshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProprietorshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProprietorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
