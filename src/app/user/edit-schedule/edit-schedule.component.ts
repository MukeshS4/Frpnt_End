import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { Diagnosis, DiagnosisDTO, Employee, Medication, Procedure, ProcedureDTO, SideNavigationItem, UpdateAppointment, UserPatientModify } from 'src/app/app-common/models';
import { PatientModifyService } from '../patient-modify.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate } from '@angular/common';
import { ScheduleService } from '../add-schedule/schedule.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConsultService } from '../service/consult.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { VisitHistoryComponent } from '../visit-history/visit-history.component';

export interface DialogData {
  appointmentId: string;
}

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;
  appointmentDate: Date = new Date();
  appointmentId:string="";
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  appointment: any;
  description:string="";
  listOfTimeSlot:string[]=[];
  listOfPhysician:Employee[]=[];
  physicianId:string="";
  form: FormGroup = new FormGroup({});
  emailId:any;

  //consultation
  diagnosisList:Diagnosis[]=[];
  procedureList:Procedure[]=[];
  medicationList:Medication[]=[];
  filteredOptions: Observable<Diagnosis[]> | undefined;
  consultForm = new FormGroup({});
  dDescription:string="";
  dDepricated:boolean=true;
  filteredProcedureOptions: Observable<Procedure[]> | undefined;
  pDescription:string="";
  pDepricated:boolean=true;
  filteredMedicationOptions:Observable<Medication[]> | undefined;
  mName:string="";
  mGenericName:string="";
  mBrandName:string="";
  mForm:string="";
  mStrength:string="";
  diagnosis1:DiagnosisDTO[]=[];
  procedure1:ProcedureDTO[]=[];
  medication1:Medication[]=[];

  constructor(private router:Router,
    private appointmentService:PatientModifyService,
    private userService:ScheduleService,@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EditScheduleComponent>,
    private consultService:ConsultService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.appointmentId=this.data.appointmentId;
    this.emailId=localStorage.getItem('emailId');
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((data:UserPatientModify)=>{
      this.appointment=data;
    });
    if(localStorage.getItem('role')=='Physician')
    {
      this.userService.findStaffByEmailId(this.emailId).subscribe(data=>{
        this.listOfPhysician.splice(0,this.listOfPhysician.length);
      this.listOfPhysician.push(data);
      });
    }
    else{
      this.listOfPhysician=this.userService.getAllStaffByRole("Physician");
    }
    this.form = new FormGroup({
      // patient: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
     this.consultForm = new FormGroup({
        medication:new FormControl(null, [Validators.required]),
        procedure:new FormControl(null, [Validators.required]),
        diagnosis:new FormControl(null, [Validators.required]),
    });
    
    this.consultService.getAllDiagnosis().subscribe((data)=>{
      this.diagnosisList.splice(0,this.diagnosisList.length);
      this.diagnosisList.push(...data);
    });

    this.consultService.getAllMedication().subscribe((data)=>{
      this.medicationList.splice(0,this.medicationList.length);
      this.medicationList.push(...data);
    });

    this.filteredOptions = this.consultForm.controls.diagnosis.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.consultService.getAllProcedure().subscribe((data)=>{
      this.procedureList.splice(0,this.procedureList.length);
      this.procedureList.push(...data);
    });

    this.filteredProcedureOptions = this.consultForm.controls.procedure.valueChanges.pipe(
      startWith(''),
      map(value => this.procedure_filter(value))
    );

    this.consultService.getAllMedication().subscribe((data)=>{
      this.medicationList.splice(0,this.medicationList.length);
      this.medicationList.push(...data);
    });

    this.filteredMedicationOptions = this.consultForm.controls.medication.valueChanges.pipe(
      startWith(''),
      map(value => this.medication_filter(value))
    );
  }
  
  appointmentDateSelectEvent(event: MatDatepickerInputEvent<Date>) {
    this.appointmentDate=event.target.value as Date;
    if(this.appointmentDate.getDay()==0){
      alert("Appointment can't be scheduled on this day");
      this.listOfTimeSlot=[];
    }else{
    this.todayString=formatDate(this.appointmentDate,'dd/MM/yyyy','en-US');
    this.listOfTimeSlot=this.appointmentService.getAllAvailableSlot(this.todayString,this.form.controls.employee.value.employeeId);   
    }   
  }
  
  showPhysicianId(event: any){
    this.physicianId=event.employeeId;
  }
  updateAppointment(){
    this.appointment=new UpdateAppointment(this.todayString,this.form.controls.time.value,this.appointment.appointmentId,this.appointment.patient,this.form.controls.description.value,this.form.controls.employee.value,this.emailId,0);
    this.appointmentService.updateAppointment(this.appointment).subscribe((data) => {      
    });
    this.dialogRef.close();
    window.location.reload();
  }

  private _filter(value: string): Diagnosis[] {
    const filterValue = value.toLowerCase();

    return this.diagnosisList.filter(diagnosis=>diagnosis.dCode.toLowerCase().includes(filterValue));
  }

  private procedure_filter(value: string): Procedure[] {
    const filterValue = value.toLowerCase();

    return this.procedureList.filter(procedure=>procedure.pCode.toLowerCase().includes(filterValue));
  }

  private medication_filter(value: string): Medication[] {
    const filterValue = value.toLowerCase();

    return this.medicationList.filter(medication=>medication.mId.toLowerCase().includes(filterValue));
  }

  onDiagnosisSelectionChange(data:Diagnosis){
    this.diagnosis1.push(new DiagnosisDTO(data,this.dDepricated));
    this.dDescription=data.dDescription;
    this.dDepricated=data.dDepricated;
  }

  onProcedureSelectionChange(data:Procedure){
    this.procedure1.push(new ProcedureDTO(data,this.pDepricated));
    this.pDescription=data.pDescription;
    this.pDepricated=data.pDepricated;
  }

  onMedicationSelectionChange(data:Medication){
    this.medication1.push(data);
    this.mName=data.name;
    this.mStrength=data.strength;
    this.mGenericName=data.genericName;
    this.mBrandName=data.brandName;
    this.mForm=data.form;
  }

  completeConsultation(){
    const consultation={
      diagnosisList:this.diagnosis1,
      procedureList:this.procedure1,
      medicationList:this.medication1
    };
    this.consultService.createConsultation(consultation,this.appointmentId).subscribe((data)=>{
      
    });
    window.location.reload();
  }

  visitHistory(id:string)
   {
     console.log("id="+id);
    this.dialog.open(VisitHistoryComponent, {
      height: '400px',
      width: '1000px',
      data:{patientId:id}
    });
   }
    
}
