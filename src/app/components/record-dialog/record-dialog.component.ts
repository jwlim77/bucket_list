import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../services/apiService.service";
import {FormControl, Validators} from "@angular/forms";

interface Student {
  items : string;
}

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})

export class RecordDialogComponent implements OnInit {


  itemArray : Student[] = [];
  displayedColumns: string[] = ['items','button'];
  dataSource = this.itemArray;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private api : ApiService,
  ) {}

  ngOnInit(): void {
  //  preprocess array

    const itemArray : Student[] = [];
    for(let element of this.data){
      itemArray.push({items : element.items});
    }

    this.itemArray = itemArray;
    this.dataSource = itemArray;

  }

  bucketList = new FormControl('' , [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1000),
    // Validators.pattern("^[0-9]+$")
  ]);

  deleteRecord(id: string){
    if(confirm("Are you sure to delete this record ?")) {
      this.api.deleteRecord(id).subscribe((res:any)=>{
        this.dataSource = this.data.filter((data : any) => data.id != id)
        alert("Record deleted")
      })
    }
  }


  onSubmit(){
    if(this.bucketList.valid){
      alert(" Item : " + this.bucketList.value)

      this.itemArray.push({items: this.bucketList.value})
      console.log(this.itemArray)
      this.dataSource= this.itemArray

    }else {
      alert("Please fill in the values !")
    }
  }


}
