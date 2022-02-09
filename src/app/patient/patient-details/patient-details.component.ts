import { Component, Input, OnInit } from '@angular/core';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import { SideNavigationItem } from 'src/app/app-common/models';
import { demographies } from '../patient-details';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  @Input() id:any;
  patientData = [''];
  posts: demographies[]=[] ;
  successModal = false;
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;
  constructor(public postService: PatientService) { }

  ngOnInit(): void {
    // this.postService.getAll(this.id).subscribe((data: any)=>{
    //   console.log(data);
    //   this.posts = data;
    //   console.log(this.posts);
    // })  
    console.log("Hit1");
    this.getData();
   
  }

  getData(){
    console.log("inside patient details getDAta");
    
    this.postService.getAll(this.id).subscribe((data: any)=>{
      console.log(data);
      var p = [];
      p.push(data);
      this.posts =   p;
    })
  }

  getPatientDetailsByEmail(emailId:string){
    this.postService.getPatient(emailId).subscribe(
      data=>{
        if(data !== null){
          // this.patientData = data;
         // this.getAllBlockedUsers();
          this.successModal=true;
        }
      },error =>{
        this.patientData = ["No Recods Found"];
      }
    )

  }

}
