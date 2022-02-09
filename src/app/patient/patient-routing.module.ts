import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduleComponent } from '../user/add-schedule/add-schedule.component';
import { HomeComponent } from './home/home.component';
import { PatientCommunityComponent } from './patient-community/patient-community.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientComponent } from './patient.component';
import { RateReviewComponent } from './rate-review/rate-review.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';


const routes: Routes = [
  {
     path: '',
     component: HomeComponent
 },
 {
  path: 'patientDetails',
  component: PatientComponent
},
 {
   path: 'patientVisit',
   component: PatientVisitComponent
 },
 {
   path: 'rate&review',
   component: RateReviewComponent
 },
 {
  path: 'schedule', 
  component: ScheduleMeetingComponent 
},
{
  path: 'patient-community',
  component: PatientCommunityComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
