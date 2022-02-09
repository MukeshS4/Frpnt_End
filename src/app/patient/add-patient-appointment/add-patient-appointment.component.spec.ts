import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientAppointmentComponent } from './add-patient-appointment.component';

describe('AddPatientAppointmentComponent', () => {
  let component: AddPatientAppointmentComponent;
  let fixture: ComponentFixture<AddPatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
