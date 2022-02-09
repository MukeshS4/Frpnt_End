import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import {TabViewModule} from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ContextMenuModule} from 'primeng/contextmenu';
import { AppCommonModule } from '../app-common/app-common.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UnlockAccountComponent } from './unlock-account/unlock-account.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminService } from './service/admin.service';
import {DialogModule} from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ActuatorsComponent } from './actuators/actuators.component';
import {ProgressBarModule} from 'primeng/progressbar';
@NgModule({
  declarations: [
    AdminComponent,
    AddUserComponent,
    UnlockAccountComponent,
    DeleteUserComponent,
    EditUserComponent,
    ActuatorsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartModule,
    ProgressBarModule,
    TabViewModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    MessagesModule,
    AppCommonModule
  ],
  providers:[
    AdminService,
  ]
})
export class AdminModule { }
