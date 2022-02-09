import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Table } from 'primeng/table';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import {
  SideNavigationItem,
  UpdateAppointment,
  UserPatientModify,
} from 'src/app/app-common/models';
import { AddScheduleComponent } from 'src/app/user/add-schedule/add-schedule.component';
import { PatientModifyService } from 'src/app/user/patient-modify.service';
import { AddPatientAppointmentComponent } from '../add-patient-appointment/add-patient-appointment.component';
import { demographies } from '../patient-details';
import { PatientService } from '../patient.service';

import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css'],
})
export class ScheduleMeetingComponent implements OnInit {
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;
  schduleForm!: FormGroup;
  @Input() id: any;
  appointment: any;
  physicianFlag: boolean = false;
  emailId: any;
  reason: string = '';
  posts: demographies[]=[] ;
  statuses: any;
  patientId: any;
  loading: boolean = false;
  submitted!: boolean;
  displayDialog: boolean = false;
  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    public dialog: MatDialog,
    private appointmentService: PatientModifyService,
    private patientService: PatientService
  ) {}
  listOfAppointment: UserPatientModify[] = [];

  ngOnInit(): void {
    console.log(localStorage.getItem('role'));

    this.schduleForm = this.fb.group({
      meetingTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      physician: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });

    if (localStorage.getItem('role') == 'Physician') {
      this.physicianFlag = true;
      this.emailId = localStorage.getItem('emailId');
      this.appointmentService
        .getAllAppointmentByStatusAndEmailId([0], this.emailId)
        .subscribe((appointment) => {
          this.listOfAppointment.splice(0, this.listOfAppointment.length);
          this.listOfAppointment.push(...appointment);
        });
    } else {
      this.checkFirstLogin();

    }
  }
  get registerFormControl() {
    return this.schduleForm.controls;
  }
  checkFirstLogin() {
    const emailId = localStorage.getItem('emailId');
    console.log('hit first' + emailId);

    this.scheduleService.checkFirstLogin(emailId).subscribe(
      (data) => {
        if (data !== null) {
          console.log("inside first login"+data);

          this.patientId = data.id;
          this.getData();
          console.log('after get data'+this.patientId);
          
      this.scheduleService
      .getAllAppointmentByStatus(this.patientId)
      .subscribe((listOfAppointment) => {
        this.listOfAppointment.splice(0, this.listOfAppointment.length); // Clear array
        this.listOfAppointment.push(...listOfAppointment); // add new element
      });
        }
      },
      (error) => {
        console.log('no proper response ', error);
      }
    );
  }

  onSubmit() {
    const RegisterData = {
      meetingTitle: this.schduleForm.controls.meetingTitle.value,
      description: this.schduleForm.controls.description.value,
      physician: this.schduleForm.controls.physician.value,
      date: this.schduleForm.controls.date.value,
      time: this.schduleForm.controls.time.value,
      reason: this.schduleForm.controls.reason.value,
    };
    console.log(RegisterData);
    this.scheduleService.meetingDetails(RegisterData).subscribe((data: any) => {
      console.log(data);
      // if (data  !== null) {
      //   this.router.navigate(['']);
      // }
    });
  }

  addAppointment() {
    console.log("inside add Appointment");
    
    this.dialog.open(AddPatientAppointmentComponent, {
     
      width: '700px'
    });
  }

  onDelete(appointment: UserPatientModify) {
    this.displayDialog = true;
    this.appointment = appointment;
  }

  cancelAppointment(rr: any) {
    this.reason = rr.value;
    this.displayDialog = false;
    this.appointmentService
      .cancelAppointment(this.appointment.appointmentId, this.reason)
      .subscribe((data) => {
        //console.log(data);
      });
    window.location.reload();
    //this.router.navigateByUrl('/user/modifyappointment');
  }

  onApprove(appointment: UserPatientModify) {
    const date = formatDate(appointment.date, 'dd/MM/yyyy', 'en-US');
    const updateAppointment = new UpdateAppointment(
      date,
      appointment.time,
      appointment.appointmentId,
      appointment.patientData,
      appointment.description,
      appointment.employee,
      this.emailId,
      1
    );

    this.appointmentService
      .updateAppointment(updateAppointment)
      .subscribe((data) => {});

    window.location.reload();
  }
  clear(table: Table) {
    table.clear();
  }

  cancel() {
    this.displayDialog = false;
  }
  getData(){
    console.log("inside patient details getDAta");
    
    this.scheduleService.getAll(this.patientId).subscribe((data: any)=>{
      console.log(data);
      var p = [];
      p.push(data);
      this.posts =   p;
    })
  }
}
