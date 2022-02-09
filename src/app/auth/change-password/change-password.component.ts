import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  samePassword = false;
  passwordMismatch = false;
  passwordChanged = false;
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.changePasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$")]],
      confirmNewPassword: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$")]]
    });
  }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['']);
  }

  submitChangePassword() {
    const passwordData = {
      username: this.changePasswordForm.controls.username.value,
      oldPassword: this.changePasswordForm.controls.oldPassword.value,
      newPassword: this.changePasswordForm.controls.newPassword.value,
      confirmNewPassword: this.changePasswordForm.controls.confirmNewPassword.value
    }
    this.authService.changePassword(passwordData).subscribe(
      data => {
        this.passwordChanged = true;
        this.changePasswordForm.reset();
        console.log("inside login service:", data);
      }, error => {
        if (error.error.message === "New Password is the same as Old Password") {
          this.samePassword = true;
          this.changePasswordForm.reset();
        } else if (error.error.message === "Old Password doesn't match") {
          this.passwordMismatch = true;
          this.changePasswordForm.reset();
        }
        else {

        }
      }
    );
  }

  get usernameControl() {
    return this.changePasswordForm.get('username') as FormControl;
  }

  get usernameControlValid() {
    return this.usernameControl.touched && !this.usernameControlInvalid;
  }

  get usernameControlInvalid() {
    return (
      this.usernameControl.touched && (this.usernameControl.hasError('required') || this.usernameControl.hasError('email'))
    );
  }

  get passwordControl() {
    return this.changePasswordForm.get('newPassword') as FormControl;
  }

  get passwordControlInvalid() {
    return (
      this.passwordControl.touched && (this.passwordControl.hasError('required') || this.passwordControl.hasError('pattern'))
    );
  }

  get passwordControlValid() {
    return this.passwordControl.touched && !this.passwordControlInvalid;
  }

  get confirmPasswordControl() {
    return this.changePasswordForm.get('confirmNewPassword') as FormControl;
  }

  get confirmPasswordControlInvalid() {
    return (
      this.confirmPasswordControl.touched && (this.passwordControl.hasError('required') || this.passwordControl.hasError('pattern')) || this.changePasswordForm.get('confirmNewPassword') === this.changePasswordForm.get('newPassword')
    );
  }

  get confirmPasswordControlValid() {
    return this.passwordControl.touched && !this.passwordControlInvalid;
  }

}
