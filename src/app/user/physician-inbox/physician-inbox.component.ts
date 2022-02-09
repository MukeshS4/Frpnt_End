import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { NotesList, SideNavigationItem, UserPatientModify } from 'src/app/app-common/models/navigation.model';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { EditHistoryComponent } from '../edit-history/edit-history.component';
import { PatientModifyService } from '../patient-modify.service';
import { SendNotesComponent } from '../send-notes/send-notes.component';
import { VisitHistoryComponent } from '../visit-history/visit-history.component';
import { InboxService } from './inbox.service';

@Component({
  selector: 'app-physician-inbox',
  templateUrl: './physician-inbox.component.html',
  styleUrls: ['./physician-inbox.component.css']
})
export class PhysicianInboxComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  displayedColumns: string[] = ['appointmentId', 'physicianName',  'patientInfo', 'editHistory','date', 'time','action' ];
  
  @ViewChild(MatTable, { static: true })
  table: MatTable<any> | undefined 

  notes: NotesList[] = [];
  sentNotes:NotesList[]=[];
  closedNotes:NotesList[]=[];
  statuses:any;
  loading: boolean=false;
  emailId:any;
  listOfAppointment:UserPatientModify[]=[];
  dataSource= new MatTableDataSource<UserPatientModify>();

  constructor(private inboxService:InboxService,private appointmentService:PatientModifyService,
    public dialog: MatDialog,private changeDetectorRefs: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.emailId=localStorage.getItem('emailId');
    if(localStorage.getItem('role')=='Physician'){
      this.appointmentService.getAllAppointmentByStatusAndEmailId([1],this.emailId).subscribe((listOfAppointment)=>{
        this.listOfAppointment.splice(0,this.listOfAppointment.length);
        this.listOfAppointment.push(...listOfAppointment);
        this.dataSource.data=listOfAppointment;
        this.changeDetectorRefs.detectChanges();
      });
    }
    else
    {
      this.appointmentService.getAllAppointment().subscribe((listOfAppointment) => {
        this.listOfAppointment.splice(0, this.listOfAppointment.length); // Clear array
        this.listOfAppointment.push(...listOfAppointment);
        this.dataSource.data=listOfAppointment; // add new element
        this.changeDetectorRefs.detectChanges();
      });     
    }
    //window.location.reload();
    this.inboxService.getAllNotes(this.emailId,"OPEN").subscribe((notes)=>{
      this.notes.splice(0,this.notes.length);
      this.notes.push(...notes);
    });
    this.inboxService.getAllSentNotes(this.emailId,"OPEN").subscribe((notes)=>{
      this.sentNotes.splice(0,this.sentNotes.length);
      this.sentNotes.push(...notes);
    });
    this.inboxService.getAllNotes(this.emailId,"CLOSE").subscribe((notes)=>{
      this.closedNotes.splice(0,this.closedNotes.length);
      this.closedNotes.push(...notes);
    });
  }

  addNotes()
   {
    this.dialog.open(SendNotesComponent, {
      height: '525px',
      width: '500px'
    });
   }

   replyNotes(senderData:any,notesId:number,parentNotesId:number)
   {
     if(parentNotesId==0)
    {
      parentNotesId=notesId;
    }
    this.dialog.open(SendNotesComponent, {
      height: '525px',
      width: '500px',
      data:{sender:senderData,
            parentNotesId:parentNotesId}
    });
   }
   closeNotes(notesId:number){
     this.inboxService.closeNotes(notesId).subscribe((data)=>{

     });
     window.location.reload();
   }
   editHistory(id:string)
  {
    this.dialog.open(EditHistoryComponent, {
      height: '300px',
      width: '800px',
      data:{appointmentId:id}
    });
  }
  visitHistory(id:string)
   {
     console.log("id="+id);
    this.dialog.open(VisitHistoryComponent, {
      height: '400px',
      width: '1000px',
      data:{patientId:id}
    });
   }
  }