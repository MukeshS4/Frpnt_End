import { Component, OnInit } from '@angular/core';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import { SideNavigationItem } from 'src/app/app-common/models';

@Component({
  selector: 'app-patient-community',
  templateUrl: './patient-community.component.html',
  styleUrls: ['./patient-community.component.css']
})
export class PatientCommunityComponent implements OnInit {
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;

  constructor() { }

  ngOnInit(): void {
  }

}
