import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Dialog/dialog/dialog.component'

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '500px',
      data: { component: DynamicComponent }
    });
  }

}
@Component({
  selector: 'dynamic-comp',
  template: `
  <div><p><b>Expense Calculation - </b><p>
  <p>Should be able to calculate the expense at retirement by inflating your current annual expense.</p></div>
  <div><p><b>Retirement Corpus Calculation - </b><p>
  <p>Should be able to calculate the (retirement corpus) amount that you want to accumulate by the time you retire.</p></div>
  <div><p><b>Monthly investments for retirement savings Calculation - </b><p>
  <p>Should be able to find out how much I need to invest monthly to save the target retirement corpus.</p></div>`
})
export class DynamicComponent {

}
