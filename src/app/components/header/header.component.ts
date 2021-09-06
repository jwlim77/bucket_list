import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerTitle : string = 'Body Mass Index (BMI) Calculator';
  description1 :string= 'Find out with this body mass index calculator.';

  constructor() { }

  ngOnInit(): void {
  }



}
