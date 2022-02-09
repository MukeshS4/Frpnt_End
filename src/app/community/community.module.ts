import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community/community.component';
import { CommunityAdminComponent } from './community-admin/community-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { AppCommonModule } from '../app-common/app-common.module';
import { CommunityService } from './community.service';
import { MomentModule } from 'ngx-moment';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    CommunityComponent,
    CommunityAdminComponent
  ],
  imports: [
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    TabViewModule,
    CommonModule,
    ProgressSpinnerModule,
    CommunityRoutingModule,
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
    CommunityService
  ],
  exports:[
    CommunityComponent
  ]
})
export class CommunityModule { }
