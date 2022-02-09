import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityAdminComponent } from './community-admin/community-admin.component';
import { CommunityComponent } from './community/community.component';

const routes: Routes = [
  { 
    path: '',
    component: CommunityComponent
  },
  {
    path: 'admin-community',
    component: CommunityAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
