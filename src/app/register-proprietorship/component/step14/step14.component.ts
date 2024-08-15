import { FormControl, AbstractControl } from '@angular/forms';
import { FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step14Form } from '../../register-proprietorship';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { LearnMoreComponent } from '../step9/learn-more/learn-more.component';


@Component({
  selector: 'app-step14',
  templateUrl: './step14.component.html',
  styleUrls: ['./step14.component.scss']
})
export class Step14Component implements OnInit {

  @Input() public formGroupName!: string;
  public isSelected: any = null;
  public formRegPropS14!: FormGroup<Step14Form>;
  public adddiscounts: any = [
    { title: 'Use Instant Book ', desc: 'Guests can book automatically.', value: 'instant'},
    { title: 'Approve or decline requests', desc: 'Guests must ask if they can book.', value: 'for_approval' },
  ]

  constructor(
    public dialog: MatDialog,
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS14 = <FormGroup>this.regPropFormRoot.control.get(this.formGroupName)
  }



  handleRadiobtn(index: any, value: string): void {
    this.isSelected = index;
    this.formRegPropS14.controls['bookingProcess'].setValue(value)
  }






}
