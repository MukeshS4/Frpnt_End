import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import { SideNavigationItem } from 'src/app/app-common/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CustomvalidationService } from '../customvalidation.service';
import { PatientService } from '../patient.service';
import { vistiDetails } from './patientVisit';
import { PatientVisitService } from './patientvisit.service';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css'],
})
export class PatientVisitComponent implements OnInit {
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;
  PvisitForm!: FormGroup;
  submitted!: boolean;
  posts: vistiDetails[]=[] ;
  patientId:any;
  visitformScreen =true;
  @Input() id:any;
  
  visitdetailsScreen=false;
  
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private patientVisitSerice: PatientVisitService,
    public postService: PatientVisitService
  ) {this.PvisitForm = this.fb.group({
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    bloodPressure: ['', [Validators.required]],
    bodyTemp: ['', [Validators.required]],
    respirationRate: ['', [Validators.required]],
    // diagnosisCd: ['', [Validators.required]],
    // diagnosisDesc: ['', [Validators.required]],
    // diagnosisIsDepricated: ['', [Validators.required]],
    // procedureCd: ['', [Validators.required]],
    // procedureDesc: ['', [Validators.required]],
    // procedureIsDepricated: ['', [Validators.required]],
    // drugID: ['', [Validators.required]],
    // drugName: ['', [Validators.required]],
    // drugGenName: ['', [Validators.required]],
    // drugBrandName: ['', [Validators.required]],
    // drugForm: ['', [Validators.required]],
    // drugStrength: ['', [Validators.required]],
  });
}


checkFirstLogin(){
  console.log(this.id);
  localStorage.setItem('patientId', this.id);
  const emailId = localStorage.getItem('emailId');
  this.patientVisitSerice.checkFirstLogin(emailId).subscribe(
    data =>{
      this.patientId=data && data.id ?data.id:null;
      this.getData();
      console.log(this.visitformScreen);
    },error=>{
      console.log("no proper response ",error);
      this.visitformScreen  =true;
    }
  )}

  ngOnInit(): void {
   this.checkFirstLogin(); 
  }


  get registerFormControl() {
    return this.PvisitForm.controls;
  }
  onSubmit() {
    console.log(this.patientId);
    if(!this.patientId)
    {
      alert("Please enter patient details first");
      return;
    }
    const RegisterData = {
      patientId:this.patientId,
      vital_signs: {
        height: this.PvisitForm.controls.height.value,
        weight: this.PvisitForm.controls.weight.value,
        blood_pressure: this.PvisitForm.controls.bloodPressure.value,
        body_temp: this.PvisitForm.controls.bodyTemp.value,
        respiration_rate: this.PvisitForm.controls.respirationRate.value,
      },
      diagnosis: {
        diagnosis: null,//this.PvisitForm.controls.diagnosisCd.value,
        description: null, //this.PvisitForm.controls.diagnosisDesc.value,
        diagnosisIsDepricated: null //this.PvisitForm.controls.diagnosisIsDepricated.value,
      },
      Procedures: {
        procedures: null, //this.PvisitForm.controls.procedureCd.value,
        description: null //this.PvisitForm.controls.procedureDesc.value,
      
      },
      medication: {
        drugID: null, //this.PvisitForm.controls.drugID.value,
        drugName: null, //this.PvisitForm.controls.drugName.value,
        drugGenName: null, //this.PvisitForm.controls.drugGenName.value,
        drugBrandName: null, //this.PvisitForm.controls.drugBrandName.value,
        drugForm: null, //this.PvisitForm.controls.drugForm.value,
        drugStrength: null, //this.PvisitForm.controls.drugStrength.value,
      },
    };
    console.log(RegisterData);
    this.submitted=true;
    console.log("in visit details submit button1");
    if(this.PvisitForm.valid){
    this.patientVisitSerice
      .patientVisitDetails(RegisterData)
      .subscribe((data) => {
        console.log(data);
        console.log("in visit details submit button2");
        
        alert("Data saved successfully");
        //this.visitdetailsScreen=true;
        this.visitformScreen=true;
        // if (data  !== null) {
        //   this.router.navigate(['']);
        // }
      });
    }
  }
  getData(){
    console.log("inside patient visit getData");
    console.log(this.patientId);
    var pId=this.patientId?this.patientId:-1
    this.postService.getAll(pId).subscribe((data: any)=>{
      console.log(data);
      var p = [];
      p.push(data);
      this.posts =   p;
    })
  }
}
