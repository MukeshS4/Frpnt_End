import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, Employee, PatientInfo } from 'src/app/app-common/models';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
private apiUrl="http://localhost:8080/user/staff";
private patientUrl="http://localhost:8080/user/patient/details";
private appoinmentUrl="http://localhost:8080/user/appointment";
listOfStaff:Employee[]=[];
listOfPatient:PatientInfo[]=[];
listOfTimeSlot:string[]=[];


  constructor(private http:HttpClient) { }

// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

findAllStaffByRole(role:string):void{
  this.http.get<Employee[]>(this.apiUrl+"/role/"+role)
  .subscribe((employee)=>{
    this.listOfStaff.splice(0,this.listOfStaff.length);
    this.listOfStaff.push(...employee);
  })
}

findStaffByEmailId(emailId:any){
 return this.http.get<Employee>(this.apiUrl+"/"+emailId).pipe(tap((resData: any) => {
    return resData;
}));
}

getAllStaffByRole(role:string){
  this.findAllStaffByRole(role);
  return this.listOfStaff;
}

findAllPatient(){
  this.http.get<PatientInfo[]>(this.patientUrl)
  .subscribe((patient)=>{
    this.listOfPatient.splice(0,this.listOfPatient.length);
    this.listOfPatient.push(...patient);
  })
}

getAllPatient(){
  this.findAllPatient();
  return this.listOfPatient;
}

getAllPatientData(){
  return this.http.get<PatientInfo[]>(this.patientUrl);
}

findAllSlotByDate(date:string,empId:string):void{
  //let params = new HttpParams().set('date', date);
  this.http.get<string[]>(this.appoinmentUrl+"/slot?date="+date+"&empId="+empId)
  .subscribe((timeSlot)=>{
    this.listOfTimeSlot.splice(0,this.listOfTimeSlot.length);
    this.listOfTimeSlot.push(...timeSlot);
  })
}

getAllAvailableSlot(date:string,empId:string){
  this.findAllSlotByDate(date,empId);
  return this.listOfTimeSlot;
}

createAppointment(appointment: Appointment):Observable<Appointment>{
  return this.http.post<Appointment>(this.appoinmentUrl, JSON.stringify(appointment),this.httpOptions);
  }

}
