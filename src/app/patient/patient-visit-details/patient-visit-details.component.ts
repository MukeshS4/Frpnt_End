import { Component, Input, OnInit } from '@angular/core';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import { SideNavigationItem } from 'src/app/app-common/models';
import { vistiDetails } from '../patient-visit/patientVisit';
import { PatientVisitService } from '../patient-visit/patientvisit.service';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {

  @Input() id:any;
  patientData = [''];
  posts: vistiDetails[]=[] ;
  successModal = false;
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;
  constructor(public postService: PatientVisitService) { }

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
    console.log("inside patient visit getData");
    console.log(this.id);
    
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
