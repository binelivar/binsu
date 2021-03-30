import { Component, OnInit } from '@angular/core';
import { ExpenseCalculationService } from '../../Services/expense-calculation.service';;
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-retirement-corpus-amt-calculation',
  templateUrl: './retirement-corpus-amt-calculation.component.html',
  styleUrls: ['./retirement-corpus-amt-calculation.component.css']
})
export class RetirementCorpusAmtCalculationComponent implements OnInit {
  lifeExpectancy: number;
  isSubmit = false;
  yrsAfterRetirement: number;
  jsonResult: any;
  error: any;
  rateOfReturns: any = [];
  retirementCorpusAmt: number;

  private _jsonURL = 'assets/json/rateOfReturn.json';

  constructor(public service: ExpenseCalculationService, private http: HttpClient) { 
  }

  form: FormGroup = new FormGroup({
    retirementExpense: new FormControl({value: this.service.expenseAtRetirement, disabled: true}),
    lifeExpectancy: new FormControl('', Validators.required),
    yrsAfterRetirement: new FormControl({value: '', disabled: true}),
    rateOfReturn: new FormControl('', Validators.required),
    inflationAdjustedReturn: new FormControl({value: '', disabled: true})
   });

  ngOnInit(): void {
    console.log(this.form);
    this.calculateYrsAfterRetirement();
    this.getRateOfReturnData();
    this.calculateInflationAdjustedReturn();
  }

  getLifeExpectancy(event: any) {
    this.lifeExpectancy = event.value;
  }
  onClear() {
    this.form.reset();
    this.initializeFormGroup();
    this.isSubmit = false;
  }
  initializeFormGroup() {
    this.form.setValue({
     retirementExpense: '',
     lifeExpectancy: '',
     yrsAfterRetirement: '',
     rateOfReturn: '',
     inflationAdjustedReturn: ''
    });
  }
  calculateYrsAfterRetirement(){
    this.form.get('lifeExpectancy')
    .valueChanges
    .subscribe(value => this.form
      .get('yrsAfterRetirement')
      .setValue(isNaN(value) ? 0 : (value - this.service.expenseCalculationForm.expectedRetirementAge.value))
    );
  }

  getRateOfReturnData(){
    this.http.get(this._jsonURL).subscribe(data =>{
      console.log(data);
      this.rateOfReturns = data;
    })
  }
  calculateInflationAdjustedReturn(){
    this.form.get('rateOfReturn')
    .valueChanges
    .subscribe(value => this.form
      .get('inflationAdjustedReturn')
      .setValue(isNaN(value) ? 0 : ((((1 + value)/(1 + this.service.expenseCalculationForm.annualInflationRate.value)) - 1) * 100).toFixed(2))
    );
  }
  onSubmit(){
    if(this.form.valid){
      this.retirementCorpusAmt = this.service.calculateRetirementCorpus(this.form.controls);
      this.isSubmit = true;
    }
  }
}
