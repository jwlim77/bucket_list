import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  description1 :string= 'Find out with this body mass index calculator.';
  description2 : string = 'This BMI calculator helps you determine your body mass index (BMI) is a calculation made by comparing a person\'s weight and height to estimate if an individual\'s weight falls within a healthy range. Though it does not actually measure the percentage of body fat, it is a useful tool in providing a rough guide for desired body weight based on your height.'

  weight = null;
  height = null;
  age : number = 0;
  calculate : boolean =false ;

  weightMetric : string = 1+1==2 ? 'KG' : 'Pounds';
  heightMetric : string = 1+1==2 ? 'Centimeters' : 'Inches';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    //calculate bmi
    this.calculate=true;
    console.log("weight : "+this.weight);
  }

  reset(){
    this.calculate=false;
    this.weight=null;
    this.height=null;
  }

}
