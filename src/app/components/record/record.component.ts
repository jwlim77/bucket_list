import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RecordDialogComponent} from '../record-dialog/record-dialog.component' ;
import {LocalStorageService} from "../../services/localStorage.service";
import {JWTTokenService} from "../../services/jwtToken.service";
import {ApiService} from "../../services/apiService.service";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  isOpen = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private localStorage : LocalStorageService ,
    private jwt : JWTTokenService,
    private api : ApiService) {
  }

  ngOnInit(): void {
  }

  async getRecord(){
    this.api.getRecord().subscribe((res : any)=>{
        this.openDialog(res)
      })
  }

  private openDialog(records : string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = records;

    let dialogRef = this.dialog.open(RecordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
