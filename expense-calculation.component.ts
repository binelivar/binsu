import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpenseCalculationService } from '../../Services/expense-calculation.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-calculation',
  templateUrl: './expense-calculation.component.html',
  styleUrls: ['./expense-calculation.component.css']
})
export class ExpenseCalculationComponent implements OnInit {
  age: number;
  retirementAge: number;
  toRetirementYears: number;
  expenseAtRetirement: number;
  isSubmit = false;

  constructor(private service: ExpenseCalculationService) { }

  form: FormGroup = new FormGroup({
   monthlyExpense: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
   annualExpense: new FormControl({value: '', disabled: true}),
   annualInflationRate: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
   currentAge: new FormControl('', Validators.required),
   expectedRetirementAge: new FormControl('', Validators.required),
   yearsToRetirement: new FormControl({value: '', disabled: true})
  });
  

  ngOnInit(): void {
    console.log(this.form);
    this.calculateAnnualMonthlyExpense();
  }
  onClear() {
    this.form.reset();
    this.initializeFormGroup();
    this.isSubmit = false;
  }

  initializeFormGroup() {
    this.form.setValue({
     monthlyExpense: '',
     annualExpense: '',
     annualInflationRate: '',
     currentAge: '',
     expectedRetirementAge: '',
     yearsToRetirement: ''
    });
  }
  getAge(event: any) {
    this.age = event.value;
    this.calculateYearsToRetirement();
  }
  getRetirementAge(event: any){
    this.retirementAge = event.value;
    this.calculateYearsToRetirement();
  }
  calculateAnnualMonthlyExpense(){
    this.form.get('monthlyExpense')
    .valueChanges
    .subscribe(value => this.form
      .get('annualExpense')
      .setValue(isNaN(value) ? 0 : 12*(value))
    );
  }
  calculateYearsToRetirement(){
    this.form
    .get('yearsToRetirement')
    .setValue(isNaN(this.retirementAge)||isNaN(this.age)  ? 0 : (this.retirementAge - this.age));
  }
  onSubmit(){
    if(this.form.valid){
      this.expenseAtRetirement = this.service.calculateExpense(this.form.controls);
      this.isSubmit = true;
    }
  }

}
