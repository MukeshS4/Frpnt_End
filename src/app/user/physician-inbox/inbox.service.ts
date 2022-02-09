import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotesList, UserPatientModify } from 'src/app/app-common/models';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  listOfUpcomingAppointment:UserPatientModify[]=[];
  private apiUrl="http://localhost:8080/user/appointment";
  private url="http://localhost:8080/user/notes";
  
  listOfNotes:NotesList[]=[];

  constructor(private http:HttpClient) {
    this.findAppointment();
   }

  findAppointment(){
    this.http.get<UserPatientModify[]>(this.apiUrl)
    .subscribe((listOfUpcomingAppointment)=>{
      this.listOfUpcomingAppointment.splice(0,this.listOfUpcomingAppointment.length);
      this.listOfUpcomingAppointment.push(...listOfUpcomingAppointment);
    })
  }

  getAllUpcomingAppointment(){
    this.findAppointment();
    return this.listOfUpcomingAppointment;
  }

  getAllNotes(emailId:string,status:string){
    return this.http.get<NotesList[]>(this.url+"/receiver/"+emailId+"/status/"+status);
  }

  getAllSentNotes(emailId:string,status:string){
    return this.http.get<NotesList[]>(this.url+"/sender/"+emailId+"/status/"+status);
  }

  closeNotes(notesId:number){
    console.log(this.url+"/"+notesId);
    
    return this.http.delete(this.url+"/"+notesId);
  }

}
