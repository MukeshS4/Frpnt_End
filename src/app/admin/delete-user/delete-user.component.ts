import { Component, OnInit } from '@angular/core';
import { staffData } from 'src/app/app-common/data/hospitalStaff.data';
import { sideNavigationItem } from 'src/app/app-common/data/navigation.data';
import { HospitalUser, SideNavigationItem } from 'src/app/app-common/models';
import { Table } from 'primeng/table';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  successModal: boolean = false;
  errorModal: boolean = false;
  sideNavigationdata: SideNavigationItem[] = sideNavigationItem;
  userData = [''];
  statuses: any;
  loading: boolean = true;
  constructor(
    private adminService : AdminService
  ) {
    
   }

  ngOnInit(): void {
    this.getUsersData();
    // this.userData= this.userData;
    this.statuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Blocked', value: 'Blocked' },
      this.loading = false,
    ]
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
  onDelete(item: any) {
    console.log(item);
    this.adminService.deleUser(item.emailId).subscribe(
      data=>{
        this.successModal = true;
        this.getUsersData();
      },error=>{
        this.errorModal = true;
      }
    )
    // this.userData = this.userData.filter(obj => obj !== item);
  }
  clear(table: Table) {
    table.clear();
  }
}