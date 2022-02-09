import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation, ConsultationList, Diagnosis, EditHistory, Medication, Procedure } from 'src/app/app-common/models';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private diagnosisUrl="http://localhost:8080/user/diagnosis";
  private procedureUrl="http://localhost:8080/user/procedure";
  private medicationUrl="http://localhost:8080/user/medication";
  private consultUrl="http://localhost:8080/user/consultation";
  private appointmentUrl="http://localhost:8080/user/appointment"
  private auditUrl="http://localhost:8080/user/audit/appointment";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })
  }

  constructor(private http:HttpClient) { }

  getAllDiagnosis(){
    return this.http.get<Diagnosis[]>(this.diagnosisUrl);
  }

  getAllProcedure(){
    return this.http.get<Procedure[]>(this.procedureUrl);
  }

  getAllMedication(){
    return this.http.get<Medication[]>(this.medicationUrl);
  }

  createConsultation(consult:Consultation,appointmentId:string)
  {
    return this.http.post<string>(this.consultUrl+"/"+appointmentId,JSON.stringify(consult),this.httpOptions);
  }

  getAllConsultation(emailId:string){
    return this.http.get<ConsultationList[]>(this.appointmentUrl+"/patient/"+emailId+"/consultation");
  }

  getAllEditHistory(appointmentId:string){
    return this.http.get<EditHistory[]>(this.auditUrl+"/"+appointmentId);
  }
}
