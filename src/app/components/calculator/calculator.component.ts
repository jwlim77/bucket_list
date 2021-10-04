import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ApiService} from "../../services/apiService.service";
import {LocalStorageService} from "../../services/localStorage.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  weight = new FormControl('' , [
    Validators.required,
    Validators.min(1),
    Validators.max(1000),
    Validators.pattern("^[0-9]+$")
  ]);
  height = new FormControl('' ,[
    Validators.required,
    Validators.min(1),
    Validators.max(1000),
    Validators.pattern("^[0-9]+$")
  ]);

  calculate : boolean =false ;
  result : string = '';
  resultLabel : string ='';
  resultColor : string ='';

  weightMetric : string = 1+1==2 ? 'KG' : 'Pounds';
  heightMetric : string = 1+1==2 ? 'Centimeters' : 'Inches';
  tab : boolean = false;

  isLoggedIn : boolean = false ;

  constructor(private api : ApiService , private localStorage : LocalStorageService) { }

  ngOnInit(): void {
    this.checkLogIn()
  }

  checkLogIn(){
    if(this.localStorage.get("access_token")){
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }
  }

  onSubmit(){
    this.checkLogIn()
    //calculate bmi
    if(this.weight.valid && this.height.valid){
      this.calculate=true;
      this.result = this.calculateBmi(this.weight.value , this.height.value/100);
      this.resultLabel = this.labelResult(parseInt(this.result))[0];
      this.resultColor = this.labelResult(parseInt(this.result))[1];
      this.tab= true;
    }else {
      alert("Please fill in the values !")
    }
  }

  reset(){
    this.calculate=false;
    this.weight.reset();
    this.height.reset();
    this.tab = false;
  }

  calculateBmi(weight: number, height: number) {
    return (weight / (height * height)).toFixed(2);
  }

  labelResult(bmi : number) : string[]{
    switch (true){
      case (bmi < 18.5):
        return ['Underweight','orange']
        break;
      case ( 18.5 <= bmi && bmi <= 24.9):
        return ['Healthy weight','green']
        break;
      case ( 25 <= bmi && bmi <= 29):
        return ['Overweight','orange']
        break;
      case ( bmi >= 30):
        return ['Obesity','red']
        break;
      default :
        return []
    }
  }

  saveRecord(){
    if(this.isLoggedIn){
      if(confirm("Are you sure to add this record ?")) {
        this.api.saveRecord({
          "height": this.height.value,
          "weight": this.weight.value,
          "bmi": this.result,
          "status": this.resultLabel
        }).subscribe((res : any)=>{
          alert("Record added")
        })
      }
    }else {
      alert("Please log in to save your record.")
    }
  }

}
