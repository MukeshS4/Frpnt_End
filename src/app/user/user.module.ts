import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { AppCommonModule } from '../app-common/app-common.module';
import { ButtonModule } from "primeng/button";
import { PhysicianInboxComponent } from './physician-inbox/physician-inbox.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { ChartModule } from 'primeng/chart';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ContextMenuModule} from 'primeng/contextmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { PatientModifyComponent } from './patient-modify/patient-modify.component';
import { SendNotesComponent } from './send-notes/send-notes.component';
import {DialogModule} from 'primeng/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from "@angular/material/icon";
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { VerifyAppointmentComponent } from './verify-appointment/verify-appointment.component';
import { PatientConsultComponent } from './patient-consult/patient-consult.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { VisitHistoryComponent } from './visit-history/visit-history.component';
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { UserCommunityComponent } from './user-community/user-community.component';
import { CommunityModule } from '../community/community.module';

@NgModule({
  declarations: [
    UserComponent,
    PhysicianInboxComponent,
    AddScheduleComponent,
    EditScheduleComponent,
    PatientModifyComponent,
    SendNotesComponent,
    VerifyAppointmentComponent,
    PatientConsultComponent,
    VisitHistoryComponent,
    EditHistoryComponent,
    UserCommunityComponent,
  ],
  imports: [
    CommonModule,
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
    MatPaginatorModule,
    MatAutocompleteModule,
    CommunityModule
  ]

})
export class UserModule { }
