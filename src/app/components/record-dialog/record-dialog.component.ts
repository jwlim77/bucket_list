import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../services/apiService.service";

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit {

  displayedColumns: string[] = ['index','weight', 'height',  'bmi' , 'status','created_on' , 'button'];
  dataSource = this.data;
  i = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private api : ApiService,
  ) {}

  ngOnInit(): void {}

  deleteRecord(id: string){
    if(confirm("Are you sure to delete this record ?")) {
      this.api.deleteRecord(id).subscribe((res:any)=>{
        this.dataSource = this.data.filter((data : any) => data.id != id)
        alert("Record deleted")
      })
    }
  }

}
