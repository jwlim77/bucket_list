import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorDescriptionComponent } from './calculator-description.component';

describe('CalculatorDescriptionComponent', () => {
  let component: CalculatorDescriptionComponent;
  let fixture: ComponentFixture<CalculatorDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
