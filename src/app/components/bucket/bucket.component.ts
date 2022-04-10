import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ApiService} from "../../services/apiService.service";
import {RecordDialogComponent} from "../record-dialog/record-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})

export class BucketComponent implements OnInit {


  calculate : boolean =false ;
  tab : boolean = false;
  isLoggedIn : boolean = false ;

  bucketList = new FormControl('' , [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1000),
  ]);
  email = new FormControl('' ,[
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1000),
    Validators.email
  ]);

  datas = [ {
    "id" : 0,
    "email": "",
    "bucketItems": [{
      "items": ""
    }]
  }]

  constructor(private api : ApiService , public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllRecords()
  }

//add bucket list
  onSubmit(){
    if(this.bucketList.valid && this.email.valid){
      alert("Email : " + this.email.value+ " Item : " + this.bucketList.value)

    }else {
      alert("Please fill in the values !")
    }
  }

  checkRecordButton(){
    //calculate bmi
    if(this.email.valid){
      let respond = this.api.getSelfBucketList(this.email.value).subscribe((res : any)=>{
        if(res.length>0){
          // this.selfData= res[0].bucketItems;
          this.openDialog(res[0].bucketItems , false)
        }else{
          this.openDialog(res , true)
        }
      })

    }else {
      alert("Please fill in the values !")
    }
  }


  private openDialog(records : string , newAccount : boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = records;
    dialogConfig.data.email = this.email.value? this.email.value:"";
    dialogConfig.data.newAccount = newAccount;

    let dialogRef = this.dialog.open(RecordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getAllRecords(){
    this.api.getAllBucketList().subscribe((res : any)=>{
      if(res.length > 0){
        this.datas=res;
      }

    })
  }

  reset(){
    this.calculate=false;
    this.bucketList.reset();
    this.email.reset();
    this.tab = false;
  }

}
