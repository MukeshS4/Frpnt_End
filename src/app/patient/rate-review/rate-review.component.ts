import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { patientSideNavigationItem } from 'src/app/app-common/data/patientNavigation';
import { SideNavigationItem } from 'src/app/app-common/models';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-rate-review',
  templateUrl: './rate-review.component.html',
  styleUrls: ['./rate-review.component.css']
})
export class RateReviewComponent implements OnInit {
  reviewData:any;
  patientId = JSON.parse(JSON.stringify(localStorage.getItem('patientId')));
  appointmentTemp:any;
  ratedOn:any;
  ratedBy:any;
  displayReviewModal:boolean=false;
  rating: number=2;
  loading: boolean = true;
  newReviewForm: FormGroup;
  statuses: any;
  sideNavigationdata: SideNavigationItem[] = patientSideNavigationItem;
  patientAppointmentData: any;
  constructor(
    private patientService: PatientService,
    private fb: FormBuilder
  ) {
    this.newReviewForm = this.fb.group({
      rating: ['', [Validators.required]],
      reviewTextArea: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.getReviewData();
    this.getAppointmentData();
    this.statuses = [
      { label: 'Completed', value: 'Completed' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Yet to Visit', value: 'Yet to Visit' },
      this.loading = false,
    ]
  }

  getAppointmentData() {
    const pId = +this.patientId;
    console.log(pId);
    this.patientService.getAppointmentData(pId).subscribe(
      data => {
        this.patientAppointmentData = data;
        console.log(this.patientAppointmentData);
      }, error => {
        console.log(error);
      }
    )
  }

  getReviewData(){
    this.patientService.getReview(localStorage.getItem('emailId')).subscribe(
      data=>{
        this.reviewData=data;
        console.log(data);
      },error=>{
        console.log(error);
      }
    )
  }

  onSubmitRateReview(p: any) {
    this.appointmentTemp=p;
    this.displayReviewModal=true;
    this.ratedBy=p.patientData.emailId;
    this.ratedOn=p.employee.emailId;
  }

  clear(table: Table) {
    table.clear();
  }
  getRating(event:any){
    this.rating=event;
    console.log(this.rating);
    console.log(event);
  }

  onReviewSubmit() {
    const rateReview = {
      review: this.newReviewForm.controls.reviewTextArea.value,
      rating: this.rating,
      ratedBy: this.ratedBy,
      ratedOn: this.ratedOn,
      appointment: this.appointmentTemp
    }
    this.displayReviewModal=false;
    console.log(rateReview);
    this.patientService.persisteReview(rateReview).subscribe(
      data=>{
        this.loading=false;
        location.reload();
      },error=>{
        console.log(error);
      }
    )

  }

}
