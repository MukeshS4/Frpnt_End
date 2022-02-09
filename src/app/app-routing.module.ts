import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './auth/service/auth.guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    //canActivate: [AuthGaurdService]
  },
  { 
    path: 'user', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    // canActivate: [AuthGaurdService]
  },
  { 
    path: 'patient', 
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    // canActivate: [AuthGaurdService] 
  },{
    path:'community',
    loadChildren:() => import('./community/community.module').then(m => m.CommunityModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurdService]
})
export class AppRoutingModule { }
