import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { demographies } from './patient-details';

@Injectable({ providedIn: 'root' })
export class PatientService {
  
  pmsDetailsService = 'pmsDetails/';
  url = 'http://localhost:9090/patientDetails';
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: AppModule
  ) {}

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
  patientDetails(RegisterData: {
    demographies: {
      title: any;
      first_name: any;
      last_name: any;
      date_of_birth: any;
      age: any;
      gender: any;
      race: any;
      ethinicity: any;
      language: any;
      email: any;
      home_address: any;
      country_code: any;
      contact_number: any;
      patient_portal_access: any;
      emergency_contact_details: {
        e_first_name: any;
        e_last_name: any;
        relationship: any;
        email_address: any;
        ecountry: any;
        contact: any;
        address: any;
        ecountryCd:any;

      };
    };
    allergies: {
      allergies: any;
      allergyid: any;
      type: any;
      allergyname: any;
      allergydescription: any;
      allergyc: any;
    };
  }) {
    const url = 'patientDetails';
    const resourceUrl='http://localhost:8200/patient/';
    console.log('inside patient service: ', RegisterData);

    return this.http
      .post(
        resourceUrl + this.pmsDetailsService + url,
        RegisterData
      )
      .pipe(
        catchError(this.customErrorHandler),
        tap((resData: any) => {
          console.log('Registration Completed - API hit success:', resData);
        })
      );


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

    checkFirstLogin(emailId: string | null) {
      const url='patientByEmail/';
      const resourceUrl = 'http://localhost:8200/patient/';
      return this.http.get<any>(resourceUrl + this.pmsDetailsService + url+ emailId).pipe(
      map((userData: any)=>{
        console.log("API HIT SUCCESS - checkFirstLogin", userData);
        localStorage.setItem('patientId',userData.id);
        return userData;
      }))
    }
    
    getPatient(emailId: string) {
      const url = 'patientDetails';
      return this.http.post<any>(this.config.resourceUrl + this.pmsDetailsService + url, emailId).pipe(
          map((userData: any) => {
              console.log(userData);
              return userData;
          })
      );
  }

  getAppointmentData(arg0: number) {
    const url = 'rate&review';
    const resourceUrl = 'http://localhost:8200/patient/';
    return this.http.post<any>(resourceUrl + url, arg0).pipe(
      map((userData: any) => {
          return userData;
      })
  );
  }

  persisteReview(rateReview: { review: any; rating: number; ratedBy: any; ratedOn: any; appointment: any; }) {
    const url = 'persistRateReview';
    const resourceUrl = 'http://localhost:8200/patient/';
    return this.http.post<any>(resourceUrl + url, rateReview).pipe(
      map((userData: any) => {
          return userData;
      })
  );
  }

  getReview(emailId: string | null) {
    const url = 'viewAllReviewsById/';
    const resourceUrl = 'http://localhost:8200/patient/';
    return this.http.get<any>(resourceUrl+ url+emailId).pipe(
      map((userData:any)=>{
        return userData;
      })
    )
  }


}
