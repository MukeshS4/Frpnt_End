import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router
  ) { 
    this.registerForm = this.fb.group({
      title:['',[Validators.required]],
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.minLength(3)]],
      emailId:['',[Validators.required,Validators.email]],
      country:['',[Validators.required]],
      contactNumber:['',[Validators.required]],
      dateOfBirth:[''],
      password:['',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$")]],
      confirmPassword:['',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$"),]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const RegisterData = {
      title: this.registerForm.controls.title.value,
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      emailId: this.registerForm.controls.emailId.value,
      dateOfBirth: this.registerForm.controls.dateOfBirth.value,
      country:this.registerForm.controls.country.value,
      contactNumber: this.registerForm.controls.contactNumber.value,
      password: this.registerForm.controls.password.value,
      confirmPassword: this.registerForm.controls.confirmPassword.value
    }
    // console.log(RegisterData);
    // this.submitted = true;
    // if (this.registerForm.valid) {
    //   alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    //   console.table(this.registerForm.value);
    // }
    this.authService.patientRegister(RegisterData).subscribe((data) => {
      console.log(data);
      if (data  !== null) {
        alert("Registraion done successfully");
        this.router.navigate(['']);
      }
    });
  }

  get titleControl() {
    return this.registerForm.get('title') as FormControl;
  }

  get titleControlValid() {
    return this.titleControl.touched && !this.titleControlInvalid;
  }

  get titleControlInvalid() {
    return (
      this.titleControl.touched && (this.fNameControl.hasError('required') )
    );
  }

  get fNameControl() {
    return this.registerForm.get('firstName') as FormControl;
  }

  get fNameControlValid() {
    return this.fNameControl.touched && !this.fNameControlInvalid;
  }

  get fNameControlInvalid() {
    return (
      this.fNameControl.touched && (this.fNameControl.hasError('required') || this.fNameControl.hasError('minlength'))
    );
  }

  get lNameControl() {
    return this.registerForm.get('lastName') as FormControl;
  }

  get lNameControlValid() {
    return this.lNameControl.touched && !this.lNameControlInvalid;
  }

  get lNameControlInvalid() {
    return (
      this.lNameControl.touched && (this.lNameControl.hasError('required') || this.lNameControl.hasError('minlength'))
    );
  }

  get emailControl() {
    return this.registerForm.get('emailId') as FormControl;
  }

  get emailControlValid() {
    return this.emailControl.touched && !this.emailControlInvalid;
  }

  get emailControlInvalid() {
    return (
      this.emailControl.touched && (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
    );
  }

  get contactControl() {
    return this.registerForm.get('contactNumber') as FormControl;
  }

  get contactControlValid() {
    return this.contactControl.touched && !this.contactControlInvalid;
  }

  get contactControlInvalid() {
    return (
      this.emailControl.touched && (this.emailControl.hasError('required') )
    );
  }


  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
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
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  get confirmPasswordControlInvalid() {
    return (
      this.confirmPasswordControl.touched && (this.passwordControl.hasError('required') || this.passwordControl.hasError('pattern')) || this.registerForm.get('confirmPassword')===this.registerForm.get('password')
    );
  }

  get confirmPasswordControlValid() {
    return this.passwordControl.touched && !this.passwordControlInvalid;
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
}
