import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientModifyComponent } from './patient-modify.component';

describe('PatientModifyComponent', () => {
  let component: PatientModifyComponent;
  let fixture: ComponentFixture<PatientModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
