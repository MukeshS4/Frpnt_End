import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditHistory } from 'src/app/app-common/models';
import { ConsultService } from '../service/consult.service';

export interface EditHistoryDialogData {
  appointmentId:string;
}

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.css']
})
export class EditHistoryComponent implements OnInit {

  displayedColumns: string[] = ['modifiedBy', 'modifiedAt', 'description'];
  listOfEditHistory:EditHistory[]=[];
  dataSource=new MatTableDataSource<EditHistory>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditHistoryDialogData,private consultService:ConsultService,
  private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.consultService.getAllEditHistory(this.data.appointmentId).subscribe((history)=>{
      this.listOfEditHistory.splice(0,this.listOfEditHistory.length);
      this.listOfEditHistory.push(...history);
      this.dataSource.data=this.listOfEditHistory;
      this.changeDetectorRefs.detectChanges();
    });
    console.log(this.listOfEditHistory);
  }

}
