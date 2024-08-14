import { FormGroup } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { NonRefundLearnmoreComponent } from './non-refund-learnmore/non-refund-learnmore.component';
import { StandardLearnmoreComponent } from './standard-learnmore/standard-learnmore.component';
import { LongtermLearnmoreComponent } from './longterm-learnmore/longterm-learnmore.component';

@Component({
  selector: 'app-step12',
  templateUrl: './step12.component.html',
  styleUrls: ['./step12.component.scss'],
  animations: [fadeInAnimation],
})
export class Step12Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS12!: FormGroup;

  constructor(
    public regPropFormRoot: FormGroupDirective,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formRegPropS12 = <FormGroup>this.regPropFormRoot.control.get(this.formGroupName)
  }

  public isSelectedShort: any ;
  public isSelectedLong: any ;

  public standardData:any =[
    {cancellTitle:'Flexible', cancellDesc:'Guest get a full refund they cancel up to a day before check-in.', selected:false},
    {cancellTitle:'Moderate', cancellDesc:'Guest get a full refund if they cancel up to 5 days before check-in.', selected:false},
    {cancellTitle:'Firm', cancellDesc:'Guest get a full refund if they cancel up to 30 days before check-in, except in certain cases.', selected:false},
    {cancellTitle:'Strict', cancellDesc:'Guest get a full refund if they cancel within 48 hours of booking and at least 14 days before check-in.', selected:false},
  ]

  public longtermData:any =[
    {cancellTitle:'Firm', cancellDesc:'Full refund up to 30 days before check-in. After that, the first 30 days of the stay are non-refundable.', selected:false},
    {cancellTitle:'Strict', cancellDesc:'Full refund if cancelled within 48 hours of booking and at least 28 days before check-in. After that, the first 30 days of the stay are non-refundable.', selected:false},
  ]
  
  openNonStandardLearnmore(): void {
    const dialogRef = this.dialog.open(StandardLearnmoreComponent, {
      width: '100%',
      maxWidth: '60rem',
      height: '100%',
      maxHeight:'45rem',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('');
    });
  }


  openNonRefundLearnmore(): void {
    const dialogRef = this.dialog.open(NonRefundLearnmoreComponent, {
      width: '100%',
      maxWidth: '60rem',
      height: '100%',
      maxHeight:'45rem',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('');
    });
  }

  openLongTermLearnmore(): void {
    const dialogRef = this.dialog.open(LongtermLearnmoreComponent, {
      width: '100%',
      maxWidth: '60rem',
      height: '100%',
      maxHeight:'45rem',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('');
    });
  }


  selectPolicyShort(indexShort:any){
    this.isSelectedShort = indexShort;
  }
  selectPolicyLong(indexLong:any){
    this.isSelectedLong = indexLong;
  }
  


}
