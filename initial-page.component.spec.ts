import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPageComponent } from './initial-page.component';

import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { NavbarComponent } from 'src/app/Shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/Shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('InitialPageComponent', () => {
  let component: InitialPageComponent;
  let fixture: ComponentFixture<InitialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule,
      MaterialModule,
    BrowserAnimationsModule,
  FormsModule,
ReactiveFormsModule],
      declarations: [ InitialPageComponent,
      NavbarComponent,
      FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
