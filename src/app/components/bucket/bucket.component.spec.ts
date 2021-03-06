import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketComponent } from './bucket.component';

describe('CalculatorComponent', () => {
  let component: BucketComponent;
  let fixture: ComponentFixture<BucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
