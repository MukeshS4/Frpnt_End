import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './service/auth.interceptor';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    AuthRoutingModule,
    ConfirmDialogModule
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
