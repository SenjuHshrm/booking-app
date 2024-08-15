import { FormControl, AbstractControl } from '@angular/forms';
import { FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step9Form } from '../../register-proprietorship';
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
  public formRegPropS9!: FormGroup<Step9Form>;
  public adddiscounts: any = [
    { title: 'Use Instant Book ', desc: 'Guests can book automatically.'},
    { title: 'Approve or decline requests', desc: 'Guests must ask if they can book.',  },
  ]

  constructor(
    public dialog: MatDialog,
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
  
  }



  handleRadiobtn(index: any): void {
    this.isSelected = index;
  }






}
