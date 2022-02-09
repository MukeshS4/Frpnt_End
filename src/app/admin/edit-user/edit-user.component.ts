import { Component, OnInit } from '@angular/core';
import { sideNavigationItem } from 'src/app/app-common/data/navigation.data';
import { patientData } from 'src/app/app-common/data/patient.data';
import { Patient, SideNavigationItem } from 'src/app/app-common/models';
import { AdminService } from '../service/admin.service';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  loading: boolean = true;
  userData = [''];
  statuses: any;
  data: any;
  successModalBlock = false;
  successModalDeactivate = false;
  successModalActivate=false;
  patientData = ['']; 
  sideNavigationdata: SideNavigationItem[] = sideNavigationItem;

  constructor(private adminService : AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getallPAtientsData();
    this.getUsersData();
    this.statuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Blocked', value: 'Blocked' },
      this.loading = false,
    ]
  }

  onSubmitStatus(item:any) {
    console.log('btn link', item);
  }

  getallPAtientsData(){
    this.adminService.getAllPatients().subscribe(
      data=>{
        if(data !== null){
          this.patientData = data;
          console.log("hey this is patient data",this.patientData);
        }
      },error =>{
        console.log(error);
        this.patientData = ["No Recods Found"];
      }
    )
  }

  getUsersData(){
    this.adminService.getAllUsers().subscribe(
      data=>{
        if(data !== null){
          this.userData = data;
        }
      },error =>{
        this.userData = ["No Recods Found"];
      }
    )
  }
  onPatientSubmitBlock(p:any){
    console.log(p);
    p.unlock=false;
    this.adminService.overridePatient(p).subscribe(
      data=>{
        console.log(data);
        this.successModalBlock=true;
        this.getallPAtientsData();
      },error=>{
        console.log(error);
      }
    )
  }
  onUserSubmitBlock(emailId:string){
    this.authService.lockAccount(emailId).subscribe(
      data=>{
        if(data!== null){
          this.successModalBlock=true;
          this.getUsersData();
        }
      },error=>{
        console.log("error in blocking user");
      }
    )
    console.log(emailId);
  }
  onPatientSubmitDeactivate(p:any){
    console.log(p);
    p.status=false;
    this.adminService.overridePatient(p).subscribe(
      data=>{
        console.log(data);
        this.successModalDeactivate=true;
        this.getallPAtientsData();
      },error=>{
        console.log(error);
      }
    )
  }
  onUserSubmitDeactivate(emailId:string){
    this.adminService.deActivate(emailId).subscribe(
      data=>{
        if(data!== null){
          this.successModalDeactivate=true;
          this.getUsersData();
        }
      },error=>{
        console.log("error in blocking user");
      }
    )
  }
  onPatientSubmitActivate(p:any){
    console.log(p);
    p.status=true;
    this.adminService.overridePatient(p).subscribe(
      data=>{
        console.log(data);
        this.successModalActivate=true;
        this.getallPAtientsData();
      },error=>{
        console.log(error);
      }
    )
  }
  onUserSubmitActivate(emailId:string){
    this.adminService.activate(emailId).subscribe(
      data=>{
        if(data!== null){
          this.successModalActivate=true;
          this.getUsersData();
        }
      },error=>{
        console.log("error in blocking user");
      }
    )
  }

  clear(table: Table) {
    table.clear();
  }

}
