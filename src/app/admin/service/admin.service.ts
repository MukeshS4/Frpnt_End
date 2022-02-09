import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AppModule } from "src/app/app.module";

@Injectable({ providedIn: 'root' })
export class AdminService {
  
    pmsStatus = 'pmsStatus/'
    pmsGetService = 'pmsGet/';
    pmsDeleteService = 'pmsDelete/';
    pmsRegisterService = 'pmsRegister/';
    pmsLock = 'pmsLock/';
    constructor(
        private http: HttpClient,
        private config: AppModule,
    ) { }


    userRegistration(RegisterData: { title: any; firstName: any; lastName: any; emailId: any; dateOfBirth: any; role: any; employeeId: any; }) {
        const url = 'register';
        return this.http.post(this.config.resourceUrl + this.pmsRegisterService + url, RegisterData)
            .pipe(tap((resData: any) => {
                console.log("Registration Completed - API hit success:", resData);
                return resData;
            })
            )
    }

    getAllUsers() {
        const url = 'getAllUsers';
        return this.http.get(this.config.resourceUrl + this.pmsGetService + url).pipe(tap((usersData: any) => {
            console.log("UsersData - API hit Success", usersData);
            return usersData;
        }))
    }

    getAllPatients() {
        const url = 'getAllPatients';
        return this.http.get(this.config.resourceUrl + this.pmsGetService + url).pipe(tap((usersData: any) => {
            console.log("UsersData - API hit Success", usersData);
            return usersData;
        }))
    }

    getStats() {
        const url = 'getStatistics';
        return this.http.get(this.config.resourceUrl + this.pmsStatus + url).pipe(tap((statistics: any) => {
            // console.log("Unique Available EmployeeId", empIdData);
            return statistics;
        }));
      }


    getEmpId() {
        const url = 'getEmployeeId';
        return this.http.get(this.config.resourceUrl + this.pmsGetService + url).pipe(tap((empIdData: any) => {
            // console.log("Unique Available EmployeeId", empIdData);
            return empIdData;
        }));
    }

    deleUser(emailId: string) {
        const url = 'deleteUser';
        return this.http.post(this.config.resourceUrl + this.pmsDeleteService + url, emailId)
            .pipe(tap((resData: any) => {
                console.log("Deletion Completed - API hit success:", resData);
                return resData;
            })
            )
    }

    activate(emailId: string) {
        const url = 'activateAccount';
        return this.http.post<any>(this.config.resourceUrl + this.pmsStatus + url, emailId).pipe(
            map(userData => {
                console.log(userData);
                return userData;
            })
        );
    }
    deActivate(emailId: string) {
        const url = 'deactivateAccount';
        return this.http.post<any>(this.config.resourceUrl + this.pmsStatus + url, emailId).pipe(
            map(userData => {
                console.log(userData);
                return userData;
            })
        );
    }

    getAllBlockedUsers() {
        const url = 'getAllBockedUsers';
        return this.http.get(this.config.resourceUrl + this.pmsGetService + url).pipe(tap((usersData: any) => {
            console.log("BlockedUsersData - API hit Success", usersData);
            return usersData;
        }))
    }

    getAllBlockedPatientss() {
        const url = 'getAllBockedPatients';
        return this.http.get(this.config.resourceUrl + this.pmsGetService + url).pipe(tap((usersData: any) => {
            console.log("BlockedUsersData - API hit Success", usersData);
            return usersData;
        }))
    }

    unBlockUser(emailId: string) {
        const url = 'unLockAccount';
        return this.http.post<any>(this.config.resourceUrl + this.pmsLock + url, emailId).pipe(
            map(userData => {
                console.log(userData);
                return userData;
            })
        );
    }

    overridePatient(p: any) {
        const url = 'overridePatient';
        return this.http.post<any>(this.config.resourceUrl + this.pmsLock + url, p).pipe(
            map(userData => {
                console.log(userData);
                return userData;
            })
        );
      }

      getAllAdminHttpTrace() :Observable<any> {
        const url = 'http://localhost:8081/actuator/httptrace';
        return this.http.get(url).pipe(tap((traceData: any) => {
            return traceData;
        }))
      }

      getAdminHealth() {
        const url = 'http://localhost:8081/actuator/health';
        return this.http.get(url).pipe(tap((traceData: any) => {
            return traceData;
        }))
      }
        

      getAllPatientHttpTrace() {
        const url = 'http://localhost:8200/actuator/httptrace';
        return this.http.get(url).pipe(tap((traceData: any) => {
            return traceData;
        }))
      }

      getPatientHealth() {
        const url = 'http://localhost:8200/actuator/health';
        return this.http.get(url).pipe(tap((traceData: any) => {
            return traceData;
        }))
      }

      getAllCommunityHttpTrace() {
        const url = 'http://localhost:8300/actuator/httptrace';
        return this.http.get(url).pipe(tap((traceData: any) => {
            return traceData;
        }))
      }

      getCommunityHealth() {
        const url = 'http://localhost:8300/actuator/health';
        return this.http.get(url).pipe(tap((traceData: any) => {
            return traceData;
        }))
      }

      getRegistrationRate() {
        const url = 'getRegistrationRate';
        return this.http.get<any>(this.config.resourceUrl + this.pmsStatus + url).pipe(
            map(userData => {
                return userData;
            })
        );
      }

}