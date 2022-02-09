import { Component, OnInit } from '@angular/core';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { Appointment, Employee, PatientInfo, SideNavigationItem } from 'src/app/app-common/models/navigation.model';
import { ScheduleService } from './schedule.service';
import {MatDatepickerInputEvent,MatDatepicker} from '@angular/material/datepicker';
import {formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})

export class AddScheduleComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  

  submitted = false;
  //addSchedule!: FormGroup;

  form: FormGroup = new FormGroup({});

  appointmentDate: Date = new Date();
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
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
    this.todayString=formatDate(this.appointmentDate,'dd/MM/yyyy','en-US');
    this.listOfTimeSlot=this.scheduleService.getAllAvailableSlot(this.todayString,this.physicianId);
    }
  } 
  constructor(private scheduleService:ScheduleService,
    private router: Router, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddScheduleComponent>
              ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      patient: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });

    this.emailId=localStorage.getItem('emailId');
    if(localStorage.getItem('role')=='Physician')
    {     
      this.scheduleService.findStaffByEmailId(this.emailId).subscribe(data=>{
        this.listOfPhysician.splice(0,this.listOfPhysician.length);
      this.listOfPhysician.push(data);
      });
    }
    else{
      this.listOfPhysician=this.scheduleService.getAllStaffByRole("Physician");
    }
    this.listOfPatient=this.scheduleService.getAllPatient();
  }
  
  get registerFormControl() {
    return this.form.controls;
  }

  save(){
    this.appointment=new Appointment(this.todayString,this.form.controls.time.value,this.form.controls.patient.value
      ,this.form.controls.description.value,this.form.controls.employee.value,this.emailId,0);
    this.scheduleService.createAppointment(this.appointment).subscribe((data) => {
      
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

}
