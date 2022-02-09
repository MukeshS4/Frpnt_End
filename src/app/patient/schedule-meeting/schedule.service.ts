import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import {  Employee, UserPatientModify } from "src/app/app-common/models";
import { AppModule } from "src/app/app.module";
import { Appointment } from "../add-patient-appointment/appointment";
import { demographies } from "../patient-details";

@Injectable({ providedIn: 'root' })
export class ScheduleService {

    pmsDetailsService = 'pmsDetails/';
    url = 'http://localhost:9090/patientDetails';
    listOfStaff:Employee[]=[];
    listOfTimeSlot:string[]=[];

    constructor(
      private http: HttpClient,
      private router: Router,
      private config: AppModule
    ) {}

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
  customErrorHandler(errorResponse: HttpErrorResponse) {
    let errorText = 'Unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorText);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorText = 'Email already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorText = 'Email entered does not Exists/ Invalid EmailId';
        break;
      case 'INVALID_PASSWORD':
        errorText = `'You've entered the wrong password'`;
        break;
    }
    return throwError(errorText);
  }
  meetingDetails(RegisterData: {
    
    meetingTitle: any;
    description: any;
    physician: any;
    date: any;
    time: any;
    reason:any;
    
  }) {
    const url = 'scheduleMeeting';
    console.log('inside patient service: ', RegisterData);
    alert("Data saved successfully");
    return this.http
      .post(
        this.config.resourceUrl + this.pmsDetailsService + url,
        RegisterData
      )
      .pipe(
        catchError(this.customErrorHandler),
        tap((resData: any) => {
          console.log('Registration Completed - API hit success:', resData);
        })
      );
  }

  
  checkFirstLogin(emailId: string | null) {
    console.log("test1");
    
    const url='patientByEmail/';
    const resourceUrl = 'http://localhost:8200/patient/';
    console.log(resourceUrl + this.pmsDetailsService + url+ emailId);
    
    return this.http.get<any>(resourceUrl + this.pmsDetailsService + url+ emailId).pipe(
    map((userData: any)=>{
      console.log("API HIT SUCCESS - checkFirstLogin", userData);
      return userData;
    }))
  }
  getAll(id:any): Observable<demographies[]>
    {
      console.log("/slot?id="+id);
      const url='patientDetails/';
      const resourceUrl = 'http://localhost:8200/patient/';
      return this.http.get<demographies[]>(  resourceUrl + this.pmsDetailsService + url+id).pipe(
        catchError(this.customErrorHandler)
      )
    }
    getAllAppointmentByStatus(status:number[])
    {
      //private apiUrl="http://localhost:8200/patient/pmsDetails/appointment/";
      const url='pmsDetails/appointment/';
      const resourceUrl ='http://localhost:8200/patient/pmsDetails/appointment/';
      console.log("inside"+status);
      console.log(resourceUrl+status);
      
      return this.http.get<UserPatientModify[]>(resourceUrl+status);
    }
    getAllStaffByRole(role:string){
      this.findAllStaffByRole(role);
      return this.listOfStaff;
    }
    findAllStaffByRole(role:string):void{
      const resourceUrl ='http://localhost:8200/patient/pmsDetails/fetchPhysicianData/';
      this.http.get<Employee[]>(resourceUrl)
      .subscribe((employee)=>{
        this.listOfStaff.splice(0,this.listOfStaff.length);
        this.listOfStaff.push(...employee);
      })
    }
    
getAllAvailableSlot(date:string,empId:string){
  console.log("Testing getAllAvailableSlot");
  this.findAllSlotByDate(date,empId);
  return this.listOfTimeSlot;
}
findAllSlotByDate(date:string,empId:string):void{
  const resourceUrl ='http://localhost:8200/patient/pmsDetails/appointment';
  console.log(resourceUrl+"/slot?date="+date+"&empId="+empId);
  this.http.get<string[]>(resourceUrl+"/slot?date="+date+"&empId="+empId)
  .subscribe((timeSlot)=>{
    this.listOfTimeSlot.splice(0,this.listOfTimeSlot.length);
    this.listOfTimeSlot.push(...timeSlot);
  })
}

createAppointment(appointment: Appointment):Observable<Appointment>{
  console.log(appointment);
  
  const resourceUrl ='http://localhost:8200/patient/pmsDetails/scheduleMeeting';
  console.log(resourceUrl);
  
  return this.http.post<Appointment>(resourceUrl, JSON.stringify(appointment),this.httpOptions);
  }
}