import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee, SendNote } from 'src/app/app-common/models';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private url="http://localhost:8080/user/notes"; 
  private staffUrl="http://localhost:8080/user/staff";
  listOfNotes:SendNote[]=[];
  listOfStaff:Employee[]=[];
  constructor(
    private http: HttpClient
  ) { }
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    createNote(sendNote: SendNote):Observable<SendNote>{
    return this.http.post<SendNote>(this.url, JSON.stringify(sendNote),this.httpOptions);
    }

    
  findAllStaffByRole(role:string):void{
    this.http.get<Employee[]>(this.staffUrl+"/role/"+role)
    .subscribe((employee)=>{
      this.listOfStaff.splice(0,this.listOfStaff.length);
      this.listOfStaff.push(...employee);
    })
  }
  
  getAllStaffByRole(role:string){
    this.findAllStaffByRole(role);
    return this.listOfStaff;
  }

  getAllStaff(){
    return this.http.get<Employee[]>(this.staffUrl);
  }
}