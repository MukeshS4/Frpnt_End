import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAppointmentComponent } from './verify-appointment.component';

describe('VerifyAppointmentComponent', () => {
  let component: VerifyAppointmentComponent;
  let fixture: ComponentFixture<VerifyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
