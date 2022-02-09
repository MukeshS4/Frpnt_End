import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { PatientInfo, SideNavigationItem } from 'src/app/app-common/models';
import { ScheduleService } from '../add-schedule/schedule.service';
import { VisitHistoryComponent } from '../visit-history/visit-history.component';

@Component({
  selector: 'app-patient-consult',
  templateUrl: './patient-consult.component.html',
  styleUrls: ['./patient-consult.component.css']
})
export class PatientConsultComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  listOfPatient: PatientInfo[]=[];

  displayedColumns: string[] = ['id', 'firstName','dateOfBirth', 'emailId', 'contactNumber', 'action'];
  dataSource= new MatTableDataSource<PatientInfo>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
   @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private scheduleService:ScheduleService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog ) { 
  }
  ngOnInit(): void {
    this.scheduleService.getAllPatientData().subscribe((patientList)=>{
      this.listOfPatient.splice(this.listOfPatient.length);
      this.listOfPatient.push(...patientList);
      this.dataSource.data=this.listOfPatient;
      this.changeDetectorRefs.detectChanges();
    });
    console.log(this.listOfPatient);
    //this.dataSource = new MatTableDataSource(this.listOfPatient);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

