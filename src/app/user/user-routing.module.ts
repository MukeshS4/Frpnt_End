import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { PatientConsultComponent } from './patient-consult/patient-consult.component';
import { PatientModifyComponent } from './patient-modify/patient-modify.component';
import { PhysicianInboxComponent } from './physician-inbox/physician-inbox.component';
import { SendNotesComponent } from './send-notes/send-notes.component';
import { UserCommunityComponent } from './user-community/user-community.component';
import { UserComponent } from './user.component';
import { VerifyAppointmentComponent } from './verify-appointment/verify-appointment.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'inbox', component: PhysicianInboxComponent },
  { path: 'modifyappointment/addschedule', component: AddScheduleComponent },
  { path: 'addschedule', component: AddScheduleComponent },
  { path: 'modifyappointment/editschedule/:appointmentId', component: EditScheduleComponent },
  { path: 'modifyappointment', component: PatientModifyComponent },
  { path: 'modifyappointment', component: PatientModifyComponent },
  { path: 'inbox/sendnotes', component: SendNotesComponent },
  { path: 'verifyappointment', component: VerifyAppointmentComponent},
  { path: 'patientconsult', component: PatientConsultComponent },
  { path: 'visithistory', component: VisitHistoryComponent },
  { path: 'edithistory', component: EditHistoryComponent},
  { path: 'usercommunity', component: UserCommunityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class UserRoutingModule { }
