import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RetirementCorpusAmtCalculationComponent } from './retirement-corpus-amt-calculation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExpenseCalculationService } from '../../Services/expense-calculation.service';
import { MaterialModule } from 'src/app/material/material.module';
import { NavbarComponent } from 'src/app/Shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/Shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RetirementCorpusAmtCalculationComponent', () => {
  let component: RetirementCorpusAmtCalculationComponent;
  let fixture: ComponentFixture<RetirementCorpusAmtCalculationComponent>;
  let expenseCalculationServiceStub: Partial<ExpenseCalculationService>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async () => {
    expenseCalculationServiceStub = {
      expenseCalculationForm : {
        expectedRetirementAge: {
          value: 60},
          annualInflationRate:{
            value: 1}
        },
      expenseAtRetirement: 50000
      }
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
      MaterialModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      HttpClientModule ],
      providers: [ { provide: ExpenseCalculationService, useValue: expenseCalculationServiceStub } ],
      declarations: [ RetirementCorpusAmtCalculationComponent,
      NavbarComponent,
    FooterComponent ]
    })
    .compileComponents();
    const expenseCalculationService = TestBed.inject(ExpenseCalculationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementCorpusAmtCalculationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
   // fixture.detectChanges();
  });
  it('should create a retirementCorpus form with 2 control not disabled', () => {
    expect(component.form.contains('lifeExpectancy')).toBeTruthy();
    expect(component.form.contains('rateOfReturn')).toBeTruthy();
  });
  it('should make the lifeExpectancy control required', () => {
    let control = component.form.get('lifeExpectancy');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
  it('should make the rateOfReturn control required', () => {
    let control = component.form.get('rateOfReturn');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
  it('should test if submit button is disabled when the form is invalid -- Required fields are empty', async(() => {

    component.form.controls['lifeExpectancy'].setValue('');

    fixture.detectChanges();

    expect(el.querySelector('button').disabled).toBeTruthy();

  }));
  it('should test if submit button is enabled when the form is valid', async(() => {

    component.form.controls['lifeExpectancy'].setValue('100');
    component.form.controls['rateOfReturn'].setValue('10');

    fixture.detectChanges();   

    expect(el.querySelector('button').disabled).toBeFalsy;

  }));
  it('should test if formSubmitted is true', async(() => {
    fixture.detectChanges();  
    component.onSubmit();
    expect(component.isSubmit).toBeTruthy;

  }));
  it('should test if submitForm method has been called', async(() => {

    fixture.detectChanges();
    spyOn(component, 'onSubmit');

    el.querySelector('button').click()

    expect(component.onSubmit).toHaveBeenCalledTimes(0);

  }));
  it('should test if the yrsAfterRetirement is calculated correct', async(() => {
    fixture.detectChanges();  
    component.form.controls['lifeExpectancy'].setValue('100');
    component.calculateYrsAfterRetirement();
    let actualResult = component.form.get('yrsAfterRetirement').value;
    let expectedResult = 40;
    expect(expectedResult).toEqual(actualResult);

  }));
  it('should test if the inflationAdjustedReturn is calculated correct', async(() => {
    fixture.detectChanges();  
    component.form.controls['rateOfReturn'].setValue('10');
    component.calculateInflationAdjustedReturn();
    let actualResult = component.form.get('inflationAdjustedReturn').value;
    let expectedResult = (5400.00).toFixed(2);
    expect(expectedResult).toEqual(actualResult);

  }));
  it('should test if on clear form isSubmit is false', async(() => {
    fixture.detectChanges();  
    component.onClear();
    expect(component.isSubmit).toBeFalsy;
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
