import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { InitialPageComponent } from './Initial-Page/initial-page/initial-page.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ExpenseCalculationComponent } from './ExpenseCalculation/expense-calculation/expense-calculation.component';
import { RetirementCorpusAmtCalculationComponent } from './RetirementCorpusAmtCalculation/retirement-corpus-amt-calculation/retirement-corpus-amt-calculation.component';
import { MonthlyInvestmentsCalculationComponent } from './MonthlyInvestmentsCalculation/monthly-investments-calculation/monthly-investments-calculation.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        AppComponent,
        InitialPageComponent,
        NavbarComponent,
        FooterComponent,
        ExpenseCalculationComponent,
        RetirementCorpusAmtCalculationComponent,
        MonthlyInvestmentsCalculationComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'RetirementCalculationSystem'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('RetirementCalculationSystem');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('RetirementCalculationSystem app is running!');
  // });
});
