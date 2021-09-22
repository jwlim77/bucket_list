import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-description',
  templateUrl: './calculator-description.component.html',
  styleUrls: ['./calculator-description.component.scss']
})
export class CalculatorDescriptionComponent implements OnInit {

  healthEffect: string[] = ['All-causes of death (mortality)', 'High blood pressure (hypertension)', 'High LDL cholesterol, low HDL cholesterol, or high levels of triglycerides (dyslipidemia)', 'Type 2 diabetes', 'Coronary heart disease' , 'Stroke' , 'Gallbladder disease'];

  constructor() { }

  ngOnInit(): void {
  }

}
