import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { Employee, SendNote, SideNavigationItem } from 'src/app/app-common/models';
import { NotesService } from './notes.service';

export interface DialogDataNotes {
  sender: Employee;
  parentNotesId:number;
}

@Component({
  selector: 'app-send-notes',
  templateUrl: './send-notes.component.html',
  styleUrls: ['./send-notes.component.css']
})

export class SendNotesComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  submitted = false;
  note:SendNote | undefined;
  sendNotes!: FormGroup;
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  response:string="";
  listOfReceiver:Employee[]=[];
  receiverName:string="";
  receiverDesignation:string="";
  emailId:any;
  parentNotesId:number=0;

  constructor(private router: Router, private formBuilder: FormBuilder, private notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNotes) { }


  ngOnInit(): void {  
    console.log(this.data);
    if(this.data==null)
    {
      if(localStorage.getItem('role')=='Physician')
      {
        this.notesService.getAllStaff().subscribe((employeeList)=>{
          this.listOfReceiver.splice(0,this.listOfReceiver.length);
          this.listOfReceiver.push(...employeeList);
        });
      }
      else{
        this.listOfReceiver=this.notesService.getAllStaffByRole("Physician");
      }
    }
    else
    {
      this.parentNotesId=this.data.parentNotesId;
      this.listOfReceiver.push(this.data.sender);
    }
    console.log("All Staff="+this.listOfReceiver);
  this.sendNotes = this.formBuilder.group({
      receiverId: new FormControl(null, [Validators.required]),
      message:new FormControl(null, [Validators.required]),
      //receiverName: new FormControl(null,[Validators.required]),
      //receiverDesignation: new FormControl(null,[Validators.required])
      priority:""
    });
   }

  showData(event: any){
    this.receiverName=event.firstName+" "+event.lastName;
    this.receiverDesignation=event.role;
  }

  onSend(){
    this.emailId=localStorage.getItem('emailId');
    this.note=new SendNote(this.sendNotes.controls.receiverId.value,this.emailId,this.sendNotes.controls.message.value
      ,this.sendNotes.controls.priority.value,"OPEN",this.parentNotesId);
    if(this.sendNotes.valid){
      this.notesService.createNote(this.note).subscribe((data) => {
        
       });
       alert('Send Notes Successfully');
    }
    else{
      alert('Please Fill mandatory Fields');
    }
    window.location.reload();  
  }
}

function SendNotes(SendNotes: any) {
  throw new Error('Function not implemented.');
}

