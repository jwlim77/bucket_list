import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sbutton',
  templateUrl: './sbutton.component.html',
  styleUrls: ['./sbutton.component.scss']
})
export class SbuttonComponent implements OnInit {
  @Input() displayValue : string ;
  @Output() clickEvent = new EventEmitter();

  constructor() {
    this.displayValue='' ;
  }

  ngOnInit(): void {
  }

  onClick(){
    this.clickEvent.emit();
}

}
