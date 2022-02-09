import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/service/auth.service';
import { PatientService } from './patient/patient.service';
import { PatientVisitService } from './patient/patient-visit/patientvisit.service';
import { ScheduleService } from './user/add-schedule/schedule.service';
import { AuthHttpInterceptor } from './auth/service/auth.interceptor';
import { AuthGaurdService } from './auth/service/auth.guard.service';
import { MomentModule } from 'ngx-moment';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    BrowserModule,
    AuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    PatientModule
  ],
  providers: [
    AuthGaurdService,
    PatientService,
    PatientVisitService,
    ScheduleService,
    {
    provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptor, multi:true 
  },
    AuthService,
  AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule {
  resourceUrl='http://localhost:8080/PMS/';
 }
function routes(routes: any, arg1: { enableTracing: true; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

