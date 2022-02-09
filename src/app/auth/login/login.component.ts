import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  incorrectPassword = false;
  accountLocked = false;
  accountLockedNotify = false;

  loginFailedCount = 0;
  role: string = '';
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$")]],
      checkbox: false,
    });
  }
  ngOnInit(){
    this.autoLogin();
  }

  autoLogin(){
    console.log("auto Login called");
    this.authService.autoLogin();
  }

  checklogin() {
    console.log("inside login");
    const loginData = {
      username: this.loginForm.controls.emailId.value,
      password: this.loginForm.controls.password.value,
    }
    console.log("hey check", loginData);
    if (loginData.password === 'Password123') {
      this.router.navigate(['/auth/change-password']);
    }
    else {
      this.authService.authenticate(loginData.username, loginData.password).subscribe(
        data => {
          this.loginFailedCount = 0;
            if (data.role === "Admin") {
              this.router.navigate(['/admin']);
            }
            else if (data.role === "Physician" || data.role === "Nurse" || data.role === "physician") {
              this.router.navigate(['/user']);
            }
            else {
              this.router.navigate(['/patient']);
            }
        }, error => {
          console.log("authenticate error", error);
          if (error.error.message === "User's Account is Locked") {
            this.accountLocked = true;
            this.loginForm.reset();
          }
          else if (error.error.message === "Unauthorized") {
            this.incorrectPassword = true;
            this.loginFailedCount = this.loginFailedCount + 1;
            if (this.loginFailedCount > 3) {
              this.authService.lockAccount(loginData.username).subscribe(
                data => {
                  this.loginFailedCount = 0;
                  this.accountLockedNotify = true;
                }, error => {
                  console.log("inside locked account", error);
                }
              );
            }
          }
        }
      );
    }

  }

  get emailControl() {
    return this.loginForm.get('emailId') as FormControl;
  }

  get emailControlValid() {
    return this.emailControl.touched && !this.emailControlInvalid;
  }

  get emailControlInvalid() {
    return (
      this.emailControl.touched && (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
    );
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  get passwordControlInvalid() {
    return (
      this.passwordControl.touched && (this.passwordControl.hasError('required') || this.passwordControl.hasError('pattern'))
    );
  }

  get passwordControlValid() {
    return this.passwordControl.touched && !this.passwordControlInvalid;
  }

}
