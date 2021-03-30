import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialPageComponent } from './Initial-Page/initial-page/initial-page.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ExpenseCalculationComponent } from './ExpenseCalculation/expense-calculation/expense-calculation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from "@angular/forms";
import { RetirementCorpusAmtCalculationComponent } from './RetirementCorpusAmtCalculation/retirement-corpus-amt-calculation/retirement-corpus-amt-calculation.component';
import { MonthlyInvestmentsCalculationComponent } from './MonthlyInvestmentsCalculation/monthly-investments-calculation/monthly-investments-calculation.component';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './Dialog/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialPageComponent,
    NavbarComponent,
    FooterComponent,
    ExpenseCalculationComponent,
    RetirementCorpusAmtCalculationComponent,
    MonthlyInvestmentsCalculationComponent,
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
