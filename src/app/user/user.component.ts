import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userSideNavigationItem } from '../app-common/data/user.navigation.data';
import { CalendarEventCustom, SideNavigationItem, UserPatientModify } from '../app-common/models/navigation.model';
import { ChartDataSets } from 'chart.js';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CalendarOptions, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; 
import { PatientModifyService } from './patient-modify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import {MatDialog} from '@angular/material/dialog';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  
  todayAppointment:number=0;
  physicianFlag=false;
  username:any;
  emailId:any;
  apiChartData:number[]=[];
  cevents:CalendarEventCustom[]=[];
 
  handleDateClick(arg: { dateStr: string; }) {
    //alert('date click! ' + arg.dateStr);
    this.dialog.open(AddScheduleComponent, {
      height: '520px',
      width: '500px',
    });
  }
 
  handleEventClick(arg:any){
    this.dialog.open(EditScheduleComponent, {
      height: '625px',
      width: '800px',
      data: {appointmentId:arg.event.title}
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events : [],
    eventClick: this.handleEventClick.bind(this)
  };

  title = 'Codingvila';
  public chart_Options: ChartOptions = {
    responsive: true,
  };
  public chart_Labels: Label[] = ['Total', 'Upcoming', 'To-Be-Verify', 'Completed'];
  public chart_Type: ChartType = 'pie';
  public chart_Legend = true;
  public chart_Plugins = [];
  public chart_Data: ChartDataSets[] = [];
  public donutColors=[
    {
      backgroundColor: [
          'rgba(92, 184, 92,1)',
          'rgba(255, 195, 0, 1)',
          'rgba(217, 83, 79,1)',
          'rgba(129, 78, 40, 1)',
    ]
    }
  ];

  constructor(private route: Router,
    private appointmentService:PatientModifyService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.emailId=localStorage.getItem('emailId');
    if(localStorage.getItem('role')=='Physician'){
      this.physicianFlag=true;
      this.appointmentService.getAppointmentStatsByEmpId(this.emailId).subscribe((stat)=>{
        this.apiChartData.slice(0,this.apiChartData.length);
        this.apiChartData.push(...stat);
      });
      this.chart_Data=[
        {
        data: this.apiChartData
      }
      ];
      this.appointmentService.getAllAppointmentByStatusAndEmailId([1],this.emailId).subscribe((appointmentList)=>{
        appointmentList.forEach((appointment) =>{
          this.cevents.push(new CalendarEventCustom(appointment.appointmentId,appointment.date+"T"+appointment.time+":00"));
        });
      })
      this.appointmentService.getScheduledAppointmentByDate(this.emailId).subscribe((appointmentList)=>{
        appointmentList.forEach((appointment)=>{
          this.todayAppointment=this.todayAppointment+1;
        })
      })
    }
    else
    {
      this.appointmentService.getAllAppointmentStats().subscribe((stat)=>{
        this.apiChartData.slice(0,this.apiChartData.length);
        this.apiChartData.push(...stat);
      });
      this.chart_Data=[
        {
        data: this.apiChartData
      }
      ];
       this.appointmentService.getAllAppointment()
       .subscribe((appointmentList)=>{
        appointmentList.forEach((appointment) =>{
          this.cevents.push(new CalendarEventCustom(appointment.appointmentId,appointment.date+"T"+appointment.time+":00"));
        });
      });
      this.appointmentService.getScheduledAppointmentBy().subscribe((appointmentList)=>{
        appointmentList.forEach((appointment)=>{
          this.todayAppointment=this.todayAppointment+1;
        })
      })
    }

    setTimeout(() => {
      this.calendarOptions = {
     initialView: 'dayGridMonth',
     dateClick: this.handleDateClick.bind(this), // bind is important!
     events: this.cevents,
     eventClick: this.handleEventClick.bind(this)
     };
   }, 2000);

   console.log(this.cevents);
 }


}

  
