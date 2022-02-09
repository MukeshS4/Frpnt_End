import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
  
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SheduleMeeting } from './schedule-meeting';


@Injectable({
  providedIn: 'root'
})
export class SheduleMeetingService {
  private apiURL = "localhost:8080";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<SheduleMeeting[]> {
    return this.httpClient.get<SheduleMeeting[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(post: any): Observable<SheduleMeeting> {
    return this.httpClient.post<SheduleMeeting>(this.apiURL, JSON.stringify(post), this.httpOptions)
    
    .pipe(
      catchError(this.errorHandler)
    )
  } 
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(errorMessage);
 }
}
