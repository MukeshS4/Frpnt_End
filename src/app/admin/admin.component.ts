import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { staffData } from '../app-common/data/hospitalStaff.data';
import { sideNavigationItem } from '../app-common/data/navigation.data';
import { patientData } from '../app-common/data/patient.data';
import { HospitalUser, Patient, SideNavigationItem } from '../app-common/models/navigation.model'
import { AdminService } from './service/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  phyCount!: number[];
  nurseCount!: number[];
  patientCount!: number[];
  registratinRate:any;
  stats:any = null;
  loading: boolean = true;
  userData = [''];
  patientData = [''];
  statuses: any;
  data: any;
  chartOptions: any;
  hospitalStaff: HospitalUser[] = staffData;
  patient: Patient[] = patientData;
  sideNavigationdata: SideNavigationItem[] = sideNavigationItem;
  constructor(
    private route: Router,
    private adminService : AdminService
  ) { }

  ngOnInit(): void {
    this.phyCount=[];
    this.nurseCount=[];
    this.patientCount=[];
    this.getRegistrationRate();
    this.getStats();
    this.getPatientsData();
    this.getUsersData();
    this.data = {
      labels: ['Jan','Feb','Mar','Aprl','May','Jun','Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        type: 'line',
        label: 'Physician',
        borderColor: '#42A5F5',
        borderWidth: 2,
        fill: false,
        data: this.phyCount
      }, {
        type: 'bar',
        label: 'Nurse',
        backgroundColor: '#66BB6A',
        data: this.nurseCount,
      }, {
        type: 'bar',
        label: 'Patient',
        backgroundColor: '#FFA726',
        data: this.patientCount
      }]
    };
    this.statuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Blocked', value: 'Blocked' },
      this.loading=false,
    ]

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }
  onSubmitStatus(link1: any, id: any) {
    //function to change the status of the Patient by Admin i.e (Active/Inactice/Block)
    console.log('btn id', id);
    console.log('btn link', link1);
  }

  getStats(){
    this.adminService.getStats().subscribe(
      data=>{
        console.log("stats :",data);
        this.stats=data;
      },error=>{
        console.log("error");
      }
    )
  }

  getRegistrationRate(){
    this.adminService.getRegistrationRate().subscribe(
      data=>{
        if(data!== null){
          this.registratinRate=data;
          for(let i=0;i<12;i++){
            this.phyCount.push(this.registratinRate.phyCount[i].count);
            this.nurseCount.push(this.registratinRate.nurseCount[i].count);
            this.patientCount.push(this.registratinRate.patientCount[i].count);
          }
        }
      },error=>{
        console.log(error);
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

  
  getPatientsData(){
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

  onSubmitEditPatient(item: any) {
    console.log(item);
  }

  onSubmitEditStaff(item: any) {
    console.log(item);
  }
  clear(table: Table) {
    table.clear();
  }

}
