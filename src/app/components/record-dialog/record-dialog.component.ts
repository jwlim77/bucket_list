import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../services/apiService.service";
import {FormControl, Validators} from "@angular/forms";

interface Item {
  items : string;
}

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})

export class RecordDialogComponent implements OnInit {


  itemArray : Item[] = [];
  dataSource = this.itemArray;
  email = '';
  newAccount = this.data.newAccount;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private api : ApiService,
  ) {}

  ngOnInit(): void {
  //  preprocess array

    const itemArray : Item[] = [];
    for(let element of this.data){
      itemArray.push({items : element.items});
    }

    this.itemArray = itemArray;
    this.dataSource = itemArray;
    this.email = this.data.email;
  }

  bucketList = new FormControl('' , [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1000),
  ]);



  onAdd(){
    if(this.bucketList.valid){
      this.itemArray.push({items: this.bucketList.value})
      this.dataSource= this.itemArray

    }else {
      alert("Please fill in the values !")
    }
    this.bucketList.reset()
  }

  onDelete(item : string){
    alert("deleting : "+item)
    this.itemArray = this.itemArray.filter(Item=>Item.items !=item );
    console.log(this.itemArray)
  }

  onUpdate(){

    console.log(this.email)

    if (!this.newAccount && this.email.length > 0) {
      let respond = confirm("Confirm update bucket list ?")
      //update
      if(respond){
        this.api.updateSelfBucketList(this.email , this.itemArray).subscribe((res : any)=>{
          if(res.length > 0){
            console.log(res)
          }
        })
      }
    } else if(!this.newAccount && this.email.length == 0) {
    //  delete
      let respond = confirm("Confirm delete bucket list ?")
      if(respond){
        this.api.deleteSelfBucketList(this.email).subscribe((res : any)=>{
          if(res.length > 0){
            console.log(res)
          }
        })
      }
    }else if(this.newAccount && this.email.length>0) {
      let respond = confirm("Confirm create bucket list ?")
      if(respond){
        this.api.createSelfBucketList(this.email , this.itemArray).subscribe((res : any)=>{
          if(res.length > 0){
            console.log(res)
          }
        })
      }
    }else {
      alert("Error updating bucket list. Please try again.")
    }
  }

  onDeleteSelfBucketList(){
    let respond = confirm("Confirm delete bucket list ?")
    if(respond && !this.newAccount){
      this.api.deleteSelfBucketList(this.email).subscribe((res : any)=>{
        if(res.length > 0){
          console.log(res)
        }
      })
    }
  }
}
