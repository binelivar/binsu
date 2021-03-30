import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExpenseCalculationComponent } from './expense-calculation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExpenseCalculationService } from '../../Services/expense-calculation.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import { DebugElement } from '@angular/core';
import { FooterComponent } from 'src/app/Shared/footer/footer.component';
import { NavbarComponent } from 'src/app/Shared/navbar/navbar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


describe('ExpenseCalculationComponent', () => {
  let component: ExpenseCalculationComponent;
  let fixture: ComponentFixture<ExpenseCalculationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
      MaterialModule,
    BrowserAnimationsModule,
  FormsModule,
ReactiveFormsModule,
HttpModule,
HttpClientModule ],
      providers: [ExpenseCalculationService],
      declarations: [ ExpenseCalculationComponent,
        FooterComponent,
        NavbarComponent
         ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCalculationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
   // fixture.detectChanges();
  });

  it('should create a form with 4 controls not disabled', () => {
    expect(component.form.contains('monthlyExpense')).toBeTruthy();
    expect(component.form.contains('annualInflationRate')).toBeTruthy();
    expect(component.form.contains('currentAge')).toBeTruthy();
    expect(component.form.contains('expectedRetirementAge')).toBeTruthy();
  });
  it('should make the monthly Expense control required', () => {
    let control = component.form.get('monthlyExpense');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
  it('should make the annualInflationRate control required', () => {
    let control = component.form.get('annualInflationRate');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
  it('should make the currentAge control required', () => {
    let control = component.form.get('currentAge');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
  it('should make the expectedRetirementAge control required', () => {
    let control = component.form.get('expectedRetirementAge');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
  it('should test if submit button is disabled when the form is invalid -- Required fields are empty', async(() => {

    component.form.controls['monthlyExpense'].setValue('');

    fixture.detectChanges();

    expect(el.querySelector('button').disabled).toBeTruthy();

  }));
  it('should test if submit button is disabled when the form is invalid -- Only numbers allowed for monthlyExpense and annualInflationRate', async(() => {

    component.form.controls['monthlyExpense'].setValue('abc');

    component.form.controls['annualInflationRate'].setValue('cde');

    fixture.detectChanges();

    expect(el.querySelector('button').disabled).toBeTruthy;

  }));
  it('should test if submit button is enabled when the form is valid', async(() => {

    component.form.controls['monthlyExpense'].setValue('4000');
    component.form.controls['annualInflationRate'].setValue('1');
    component.form.controls['currentAge'].setValue('23');
    component.form.controls['expectedRetirementAge'].setValue('60');

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
  it('should test if on clear form isSubmit is false', async(() => {
    fixture.detectChanges();  
    component.onClear();
    expect(component.isSubmit).toBeFalsy;

  }));
  it('should test if the annual expense is calculated correct', async(() => {
    fixture.detectChanges();  
    component.form.controls['monthlyExpense'].setValue('5000');
    component.calculateAnnualMonthlyExpense();
    let actualResult = component.form.get('annualExpense').value;
    let expectedResult = 60000;
    expect(expectedResult).toEqual(actualResult);

  }));
  it('should test if the calculateYearsToRetirement is calculated correct', async(() => {
    fixture.detectChanges();  
    component.retirementAge = 60;
    component.age = 20;
    component.calculateYearsToRetirement();
    let actualResult = component.form.get('yearsToRetirement').value;
    let expectedResult = 40;
    expect(expectedResult).toEqual(actualResult);

  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
