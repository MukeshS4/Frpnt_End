import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from '../auth/service/auth.guard.service';
import { ActuatorsComponent } from './actuators/actuators.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminComponent } from './admin.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UnlockAccountComponent } from './unlock-account/unlock-account.component';

const routes: Routes = [
  { 
    path: '',
    canActivate:[AuthGaurdService], 
    component: AdminComponent 
  },
  {
    path: 'add-user',
    // canActivate:[AuthGaurdService],
    component: AddUserComponent
  },
  {
    path: 'edit-user',
    canActivate:[AuthGaurdService],
    component: EditUserComponent
  },
  {
    path: 'delete-user',
    canActivate:[AuthGaurdService],
    component: DeleteUserComponent
  },
  {
    path: 'unlock-account',
    canActivate:[AuthGaurdService],
    component: UnlockAccountComponent
  },
  {
    path: 'actuator-metrics',
    component: ActuatorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
