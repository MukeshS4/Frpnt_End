import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { sideNavigationItem } from 'src/app/app-common/data/navigation.data';
import { patientData } from 'src/app/app-common/data/patient.data';
import { SideNavigationItem } from 'src/app/app-common/models';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-actuators',
  templateUrl: './actuators.component.html',
  styleUrls: ['./actuators.component.css']
})
export class ActuatorsComponent implements OnInit {
  adminHealth:boolean = false;
  patientHealth:boolean = false;
  communityHealth:boolean = false;
  value:number=0;
  sideNavigationdata: SideNavigationItem[] = sideNavigationItem;
  adminTrace: any;
  patientTrace: any;
  communityTrace: any;
  setInterval = setInterval;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getAdminHealth();
    this.getCommunityHealth();
    this.getPatientHealth();
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(interval);
      }
  }, 500);
    this.adminHttpTrace();
    this.patientHttpTrace();
    this.communityHttpTrace();
    // setInterval(this.adminHttpTrace, 5000);
  }

  getAdminHealth(){
    this.adminService.getAdminHealth().subscribe(
      data => {
        if(data.status === "UP"){
          this.adminHealth=true;
        }else{
          this.adminHealth=false;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  adminHttpTrace() {
    this.adminService.getAllAdminHttpTrace().subscribe(
      data => {
        this.adminTrace = Object.entries(data.traces);
      }, error => {
        console.log(error);
      }
    )
  }

  getPatientHealth(){
    this.adminService.getPatientHealth().subscribe(
      data => {
        if(data.status === "UP"){
          this.patientHealth=true;
        }else{
          this.patientHealth=false;
        }
      }, error => {
        console.log(error);
      }
    )
  }


  patientHttpTrace() {
    this.adminService.getAllPatientHttpTrace().subscribe(
      data => {
        this.patientTrace = Object.entries(data.traces);
      }, error => {
        console.log(error);
      }
    )
  }

  getCommunityHealth(){
    this.adminService.getCommunityHealth().subscribe(
      data => {
        if(data.status === "UP"){
          this.communityHealth=true;
        }else{
          this.communityHealth=false;
        }
      }, error => {
        console.log(error);
      }
    )
  }


  communityHttpTrace() {
    this.adminService.getAllCommunityHttpTrace().subscribe(
      data => {
        this.communityTrace = Object.entries(data.traces);
      }, error => {
        console.log(error);
      }
    )
  }

}
function intervalFunction() {
  throw new Error('Function not implemented.');
}

