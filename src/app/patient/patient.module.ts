import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { HomeComponent } from './home/home.component';
import { PatientVisitDetailsComponent } from './patient-visit-details/patient-visit-details.component';
import { RateReviewComponent } from './rate-review/rate-review.component';
import {RatingModule} from 'primeng/rating';
import { UserRoutingModule } from '../user/user-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogModule } from 'primeng/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AddPatientAppointmentComponent } from './add-patient-appointment/add-patient-appointment.component';
import { PatientCommunityComponent } from './patient-community/patient-community.component';
import { CommunityComponent } from '../community/community/community.component';
import { CommunityModule } from '../community/community.module';


@NgModule({
  declarations: [
    PatientComponent,
    PatientVisitComponent,
    ScheduleMeetingComponent,
    PatientDetailsComponent,
    HomeComponent,
    PatientVisitDetailsComponent,
    RateReviewComponent,
    AddPatientAppointmentComponent,
    PatientCommunityComponent,
  ],
  imports: [
    TableModule,
    DropdownModule,
    InputTextModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    PatientRoutingModule,
    AppCommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    UserRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    AppCommonModule,
    MatMenuModule,
    ChartModule,
    TabViewModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ContextMenuModule,
    ButtonModule,
    ToolbarModule,
    MatRadioModule,
    DialogModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    ChartsModule,
    FullCalendarModule,
    CommunityModule
  ]
})
export class PatientModule { }
