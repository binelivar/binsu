import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './Initial-Page/initial-page/initial-page.component';
import { ExpenseCalculationComponent } from './ExpenseCalculation/expense-calculation/expense-calculation.component';
import { RetirementCorpusAmtCalculationComponent } from './RetirementCorpusAmtCalculation/retirement-corpus-amt-calculation/retirement-corpus-amt-calculation.component';
import { MonthlyInvestmentsCalculationComponent } from './MonthlyInvestmentsCalculation/monthly-investments-calculation/monthly-investments-calculation.component';

const routes: Routes = [
  {
    path : '', redirectTo:"/initial", pathMatch: 'full'
  },
  {
    path: 'initial', component: InitialPageComponent
  },
  {
    path: 'expense', component: ExpenseCalculationComponent
  },
  {
    path: 'retirementCorpus', component: RetirementCorpusAmtCalculationComponent
  },
  {
    path: 'monthlyInvestments',component: MonthlyInvestmentsCalculationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
