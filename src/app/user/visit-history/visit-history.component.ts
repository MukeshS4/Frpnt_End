import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultationList, PatientInfo, UserPatientModify } from 'src/app/app-common/models';
import { ScheduleService } from '../add-schedule/schedule.service';
import { ConsultService } from '../service/consult.service';

export interface Student {
  rollNo: number;
  name: string;
  marks: number;
  standard: string;
  isExpanded: boolean;
}

const data: Student[] = [
  { isExpanded: false, rollNo: 1, name: 'Ramesh', marks: 78, standard: '10' },
  { isExpanded: false, rollNo: 2, name: 'Suresh', marks: 56, standard: '12' },
  { isExpanded: false, rollNo: 3, name: 'Adi', marks: 77, standard: '7' },
  { isExpanded: false, rollNo: 4, name: 'Rina', marks: 57, standard: '9' },
  { isExpanded: false, rollNo: 5, name: 'Tapil', marks: 66, standard: '9' },
  { isExpanded: false, rollNo: 6, name: 'Sugul', marks: 88, standard: '5' },
  { isExpanded: false, rollNo: 7, name: 'Aftar', marks: 46, standard: '5' },
  { isExpanded: false, rollNo: 8, name: 'Oxa', marks: 57, standard: '5' },
  { isExpanded: false, rollNo: 9, name: 'Tam', marks: 76, standard: '5' },
  { isExpanded: false, rollNo: 10, name: 'Luis', marks: 87, standard: '7' }
];

export class Marks {
  test: string | undefined;
  marathi: number | undefined;
  english: number | undefined;
  maths: number | undefined;
}

const marksForPerticularStudent: Marks[] = [
  { test: 'test 1', marathi: 60, english: 65, maths: 45 },
  { test: 'test 2', marathi: 67, english: 40, maths: 40 },
  { test: 'test 3', marathi: 57, english: 66, maths: 55 },
  { test: 'test 4', marathi: 76, english: 68, maths: 76 },
  { test: 'test 5', marathi: 76, english: 68, maths: 76 },
  { test: 'test 6', marathi: 76, english: 68, maths: 76 },
  { test: 'test 7', marathi: 76, english: 68, maths: 76 },
  { test: 'test 8', marathi: 76, english: 68, maths: 76 }
];


export interface DialogData {
  patientId: string;
}

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VisitHistoryComponent implements OnInit {

  //displayedColumns = ['appointmentId', 'physicianName', 'date', 'appointmentDescription'];
  displayedColumnsSecondTable = ['test', 'marathi', 'english'];

  // dataSource = new MatTableDataSource<Student>();
   dataSourceSecondTable = new MatTableDataSource<ConsultationList>();
   listOfConsultation1: ConsultationList[]=[];

  @ViewChild('mainTablePaginator')
  mainTablePaginator!: MatPaginator;
  @ViewChildren('subTablePaginator') subTablePaginator = new QueryList<MatPaginator>();

  // constructor() { }

  listOfConsultation: ConsultationList[]=[];
  moreDetail:boolean=true;

  displayedColumns: string[] = ['appointmentId', 'physicianName','date', 'appointmentDescription'];
  dataSource= new MatTableDataSource<ConsultationList>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private consultService:ConsultService, 
    private changeDetectorRefs: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  
    console.log("inside visit="+this.data);
    this.consultService.getAllConsultation(this.data.patientId).subscribe((consultationList)=>{
      this.listOfConsultation.splice(this.listOfConsultation.length);
      this.listOfConsultation.push(...consultationList);
      this.dataSource.data=this.listOfConsultation;
      this.changeDetectorRefs.detectChanges();
    });
    console.log(this.listOfConsultation);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  //   visitHistory()
  // {
  //   this.dialog.open(AddScheduleComponent, {
  //     height: '500px',
  //     width: '600px',
  //   });
  //}
  }
  
// }

// ngOnInit(): void {
//   this.dataSource.data = data;
//   this.dataSource.paginator = this.mainTablePaginator;
// }

expandCollapse(row: { isExpanded: boolean; }, index: any) {
  row.isExpanded = row.isExpanded === true ? false : true;
  console.log(index);
  console.log(this.listOfConsultation[index]);
  this.listOfConsultation1.splice(0,this.listOfConsultation1.length);
  this.listOfConsultation1.push(this.listOfConsultation[index]);
   //this.dataSourceSecondTable[index] = new MatTableDataSource<ConsultationList>();
   this.dataSourceSecondTable.data = this.listOfConsultation1;
  // this.dataSourceSecondTable[index].paginator = this.subTablePaginator.toArray()[index];
}

// viewMore(){
// this.moreDetail=true;
// }

}
