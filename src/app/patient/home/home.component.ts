import { Component, OnInit } from '@angular/core';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import { SideNavigationItem } from 'src/app/app-common/models';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailId = localStorage.getItem('emailId');
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;
  constructor(private patientService: PatientService) { 
  }

  ngOnInit(): void {
    this.patientService.checkFirstLogin(this.emailId).subscribe(
      data=>{
        console.log("HOME",data);
        localStorage.setItem('patientId', data.id);
      },error=>{
        console.log("HOME ERROR:",error);
      }
    );
    console.log(localStorage.getItem('patientId'));
  }


}
