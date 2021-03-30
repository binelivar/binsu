import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ExpenseCalculationService {
expenseAtRetirement: number;
expenseCalculationForm: any;
retirementCorpusCalculationForm: any;
retirementCorpusAmt: number;
monthlyInvestmentsCalculationForm: any;
monthlyInvestments: number;
calculatedMonthsToRetire: number;

  constructor() { 
  }

  calculateExpense(form: any){
    this.expenseCalculationForm = form;
    this.expenseAtRetirement = +((Math.pow((1+form.annualInflationRate.value/100), form.yearsToRetirement.value))*form.annualExpense.value).toFixed(2);
    return this.expenseAtRetirement;
  }
  calculateRetirementCorpus(form: any){
    this.retirementCorpusCalculationForm = form;
     this.retirementCorpusAmt = +(form.retirementExpense.value * form.yrsAfterRetirement.value * form.inflationAdjustedReturn.value).toFixed(2);
    return this.retirementCorpusAmt;
  }
  calculateMonthlyInvestments(form: any){
    this.monthlyInvestmentsCalculationForm = form;
    this.calculatedMonthsToRetire = (form.yearsToRetirement.value) * 12;
    this.monthlyInvestments = +(((form.retirementCorpusAmount.value) * (+form.rateOfInterest.value) * (Math.pow((1 + (+form.rateOfInterest.value)), this.calculatedMonthsToRetire))) / (Math.pow((1 + (+form.rateOfInterest.value)), (this.calculatedMonthsToRetire - 1)))).toFixed(2);
    return this.monthlyInvestments;
  }
}
