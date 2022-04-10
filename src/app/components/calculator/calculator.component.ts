import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ApiService} from "../../services/apiService.service";
import {LocalStorageService} from "../../services/localStorage.service";
import {RecordDialogComponent} from "../record-dialog/record-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent implements OnInit {


  calculate : boolean =false ;
  result : string = '';
  resultLabel : string ='';
  resultColor : string ='';


  // selfData = [
  //       {
  //         "id": "0",
  //         "items": ""
  //       }
  // ]

  tab : boolean = false;

  isLoggedIn : boolean = false ;

  bucketList = new FormControl('' , [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1000),
    // Validators.pattern("^[0-9]+$")
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

  constructor(private api : ApiService , private localStorage : LocalStorageService , public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.checkLogIn()
    this.getAllRecords()
  }

  checkLogIn(){
    if(this.localStorage.get("access_token")){
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = true
    }
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

      // this.tab= true;
      // this.calculate = true;
      // this.result = '123.00';

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


//   this.api.getSelfBucketList({},{
//     "email": this.email.value,
//     "bucketList": this.bucketList.value,
//     "bmi": this.result,
//     "status": this.resultLabel
//   }).subscribe((res : any)=>{
//   alert("Record added")
// })

  reset(){
    this.calculate=false;
    this.bucketList.reset();
    this.email.reset();
    this.tab = false;
  }

  //
  //
  // saveRecord(){
  //   if(this.isLoggedIn){
  //     if(confirm("Are you sure to add this record ?")) {
  //       this.api.saveRecord({
  //         "email": this.email.value,
  //         "bucketList": this.bucketList.value,
  //         "bmi": this.result,
  //         "status": this.resultLabel
  //       }).subscribe((res : any)=>{
  //         alert("Record added")
  //       })
  //     }
  //   }else {
  //     alert("Please log in to save your record.")
  //   }
  // }

}
