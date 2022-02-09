import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sideNavigationItem } from 'src/app/app-common/data/navigation.data';
import { SideNavigationItem } from 'src/app/app-common/models';
import { AdminService } from '../service/admin.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isAdmin = false;
  invalidEmailAddress = false;
  isLoading = false;
  idUnavailable = false;
  prepopEmpId = [''];
  successModal: boolean = false;
  errorModal: boolean = false;
  userExistModal: boolean = false;
  userRegisterForm: FormGroup;
  sideNavigationdata: SideNavigationItem[] = sideNavigationItem;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
  ) {
    this.userRegisterForm = this.fb.group({
      title: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailId: ['', [Validators.required, Validators.email]],
      dateOfBirth: [''],
      role: ['', [Validators.required]],
      employeeId: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[0-9]).{6}$")]],
    })
  }

  ngOnInit(): void {
    this.getAvailableEmpId();
    this.isLoading = false;
  }

  onChangeEvent(event: any) {
    this.idUnavailable = !this.prepopEmpId.includes(event.target.value);
  }

  getAvailableEmpId() {
    this.adminService.getEmpId().subscribe(
      data => {
        if (data !== null) {
          console.log(data);
          this.prepopEmpId = data;
        }
      }, error => {
        this.prepopEmpId = ["No Recods Found"];
      }
    )
  }
  onUserSubmit() {
    this.isLoading = true;
    const RegisterData = {
      title: this.userRegisterForm.controls.title.value,
      firstName: this.userRegisterForm.controls.firstName.value,
      lastName: this.userRegisterForm.controls.lastName.value,
      emailId: this.userRegisterForm.controls.emailId.value,
      dateOfBirth: this.userRegisterForm.controls.dateOfBirth.value,
      role: this.userRegisterForm.controls.role.value,
      employeeId: this.userRegisterForm.controls.employeeId.value,
    }
    this.adminService.userRegistration(RegisterData).subscribe(
      data => {
        if (data !== null) {
          this.successModal = true;
          this.userRegisterForm.reset();
          this.isLoading = false;
        }
      }, error => {
        console.log(error);
        if (error.error.message === "User is already Registered") {
          this.userExistModal = true;
          this.isLoading = false;
          this.userRegisterForm.reset();
        } else if (error.error.message === "Provided Email Id in incorrect or invalid") {
          this.invalidEmailAddress = true;
          this.isLoading = false;
          this.userRegisterForm.reset();
        }
        else if (error.error.message === "Only a single admin can persist") {
          this.isAdmin = true;
          this.isLoading = false;
          this.userRegisterForm.reset();
        }
        else {
          this.errorModal = true;
          this.isLoading = false;
        }
      }
    );
  }

  get titleControl() {
    return this.userRegisterForm.get('title') as FormControl;
  }

  get titleControlValid() {
    return this.titleControl.touched && !this.titleControlInvalid;
  }

  get titleControlInvalid() {
    return (
      this.titleControl.touched && (this.fNameControl.hasError('required'))
    );
  }

  get fNameControl() {
    return this.userRegisterForm.get('firstName') as FormControl;
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
    return this.userRegisterForm.get('lastName') as FormControl;
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
    return this.userRegisterForm.get('emailId') as FormControl;
  }

  get emailControlValid() {
    return this.emailControl.touched && !this.emailControlInvalid;
  }

  get emailControlInvalid() {
    return (
      this.emailControl.touched && (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
    );
  }

  get roleControl() {
    return this.userRegisterForm.get('role') as FormControl;
  }

  get roleControlValid() {
    return this.roleControl.touched && !this.roleControlInvalid;
  }

  get roleControlInvalid() {
    return (
      this.roleControl.touched && (this.emailControl.hasError('required'))
    );
  }


  get employeeIdControl() {
    return this.userRegisterForm.get('employeeId') as FormControl;
  }

  get passwordControlInvalid() {
    return this.employeeIdControl.hasError('pattern')
  }

  get employeeIdControlValid() {
    return !this.passwordControlInvalid;
  }


}
