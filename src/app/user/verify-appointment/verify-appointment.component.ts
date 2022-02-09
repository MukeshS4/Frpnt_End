import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { SideNavigationItem, UpdateAppointment, UserPatientModify } from 'src/app/app-common/models';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { PatientModifyService } from '../patient-modify.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-verify-appointment',
  templateUrl: './verify-appointment.component.html',
  styleUrls: ['./verify-appointment.component.css']
})
export class VerifyAppointmentComponent implements OnInit {

  userSideNavigationdata: SideNavigationItem[] = userSideNavigationItem;

  physicianFlag:boolean=false;

  statuses:any;
  loading: boolean=false;
  displayDialog:boolean=false;
  reason:string="";
  appointment:any;
  emailId:any;

  constructor(private appointmentService:PatientModifyService,private router:Router,public dialog: MatDialog) { }
  listOfAppointment: UserPatientModify[]=[];
  ngOnInit(): void {
    if(localStorage.getItem('role')=='Physician')
    {
      this.physicianFlag=true;
      this.emailId=localStorage.getItem('emailId');
      this.appointmentService.getAllAppointmentByStatusAndEmailId([0],this.emailId).subscribe((appointment)=>{
        this.listOfAppointment.splice(0,this.listOfAppointment.length);
        this.listOfAppointment.push(...appointment);
      });
    }
    else
    {
      this.appointmentService.getAllAppointmentByStatus([0])
      .subscribe((listOfAppointment) => {
        this.listOfAppointment.splice(0, this.listOfAppointment.length); // Clear array
        this.listOfAppointment.push(...listOfAppointment); // add new element
      });
    }
  }

  addAppointment()
  {
    this.dialog.open(AddScheduleComponent, {
      height: '600px',
      width: '700px',
    });
  }

  onDelete(appointment:UserPatientModify){
    this.displayDialog=true;
    this.appointment=appointment;
  }

  cancelAppointment(rr:any){
    this.reason=rr.value;
    this.displayDialog=false;
    this.appointmentService.cancelAppointment(this.appointment.appointmentId,this.reason).subscribe((data) => { 
      //console.log(data);     
    });
    window.location.reload();
    //this.router.navigateByUrl('/user/modifyappointment');
  }

  onApprove(appointment:UserPatientModify){
    const date=formatDate(appointment.date,'dd/MM/yyyy','en-US');
    const updateAppointment=new UpdateAppointment(date,appointment.time,appointment.appointmentId,
      appointment.patientData,appointment.description,appointment.employee,this.emailId,1);

      this.appointmentService.updateAppointment(updateAppointment).subscribe((data) => {      
      });

    window.location.reload();
  }
  clear(table: Table) {
    table.clear();
  }

  cancel() {
    this.displayDialog=false;
}

}
