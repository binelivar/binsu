import { Component, OnInit, Inject, ViewChild, TemplateRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   this.loadComponents();
  }
  loadComponents(){
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
  }
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
