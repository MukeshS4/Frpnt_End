import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {  Employee, PatientInfo } from 'src/app/app-common/models';
import { AddScheduleComponent } from 'src/app/user/add-schedule/add-schedule.component';
import { demographies } from '../patient-details';
import { ScheduleService } from '../schedule-meeting/schedule.service';
import { Appointment } from './appointment';

@Component({
  selector: 'app-add-patient-appointment',
  templateUrl: './add-patient-appointment.component.html',
  styleUrls: ['./add-patient-appointment.component.css']
})
export class AddPatientAppointmentComponent implements OnInit {

  

  submitted = false;
  //addSchedule!: FormGroup;
  posts: demographies[]=[] ;
  form: FormGroup = new FormGroup({});

  appointmentDate: Date = new Date();
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  patientId: any;
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  listOfPhysician:Employee[]=[];
  listOfPhysician1:string[]=["abc","def","ghi"];
  listOfPatient:PatientInfo[]=[];
  listOfTimeSlot:string[]=[];
  patientName:string="";
  physicianId:string="";
  appointment:Appointment | undefined;
  emailId:any;

  appointmentDateSelectEvent(event: MatDatepickerInputEvent<Date>) {
    
    this.appointmentDate=event.target.value as Date;
    if(this.appointmentDate.getDay()==0){
      alert("Appointment can't be scheduled for this day");
      this.listOfTimeSlot=[];
    }else{
      console.log("testing listOfTimeSlot");
      
    this.todayString=formatDate(this.appointmentDate,'dd/MM/yyyy','en-US');
    console.log(this.todayString);
    
    this.listOfTimeSlot=this.scheduleService.getAllAvailableSlot(this.todayString,this.physicianId);
    }
  } 
  constructor(private scheduleService:ScheduleService,
    private router: Router, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddScheduleComponent>
              ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      //patient: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });

    this.emailId=localStorage.getItem('emailId');
    console.log(localStorage.getItem('role'));
    
    // if(localStorage.getItem('role')=='Physician')
    // {     
    //   this.scheduleService.findStaffByEmailId(this.emailId).subscribe(data=>{
    //     this.listOfPhysician.splice(0,this.listOfPhysician.length);
    //   this.listOfPhysician.push(data);
    //   });
    // }
    // else{
      console.log("first log");
      
      this.listOfPhysician=this.scheduleService.getAllStaffByRole("Physician");
      const emailId = localStorage.getItem('emailId');
      this.checkFirstLogin();
//      this.listOfPatient=this.scheduleService.getAllPatient();
    }
   // 
 // }
  
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
        
    
      }
    },
    (error) => {
      console.log('no proper response ', error);
    }
  );
}


  get registerFormControl() {
    return this.form.controls;
  }

  save(){
    console.log("in save testing");
    console.log(this.todayString,this.form.controls.time.value
      ,this.form.controls.description.value,this.form.controls.employee.value,this.emailId,0);
    console.log(this.patientId);
    
    this.appointment=new Appointment(this.todayString,this.form.controls.time.value,this.patientId
      ,this.form.controls.description.value,this.form.controls.employee.value,this.emailId,0);
    this.scheduleService.createAppointment(this.appointment).subscribe((data) => {
      //alert("Appointment saved successfully");
     });
    
     if(this.form.valid){
      
    //alert('Appointment Added Successfully');
     //this.router.navigateByUrl('/user/modifyappointment');
     this.dialogRef.close();
     }
     else{
       alert('Please Fill All The Fields')
     }
     window.location.reload();
    //this.router.navigateByUrl('/user/modifyappointment');
  }

  showPhysicianId(event: any){
    this.physicianId=event.employeeId;
  }

  showPatientName(event: any){
    this.patientName=event.firstName+" "+event.lastName;
  }
  getData(){
    console.log("inside patient details getDAta");
    
    this.scheduleService.getAll(this.patientId).subscribe((data: any)=>{
      console.log(data);
      var p = [];
      p.push(data);
      this.posts =   p;
      console.log("posts"+this.posts);
      
    })
  }

}
