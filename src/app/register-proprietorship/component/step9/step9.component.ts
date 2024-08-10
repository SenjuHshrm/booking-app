import { FormControl, AbstractControl } from '@angular/forms';
import { FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step9Form } from '../../register-proprietorship';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { LearnMoreComponent } from './learn-more/learn-more.component';

@Component({
  selector: 'app-step9',
  templateUrl: './step9.component.html',
  styleUrls: ['./step9.component.scss'],
  animations: [fadeInAnimation],
})
export class Step9Component implements OnInit {

  @Input() public formGroupName!: string;
  public isSelected: any = null;
  public formRegPropS9!: FormGroup<Step9Form>;
  public adddiscounts: any = [
    { label: 20, name: '20% Off', desc: 'Offer 20% off your first 3 bookings', value: 'discount_1' },
    { label: 30, name: '30% Off', desc: 'For stays of 7 nights or more', value: 'discount_2' },
    { label: 50, name: '40% Off', desc: 'For stays of 28 nights or more', value: 'discount_3' },
  ]

  constructor(
    public dialog: MatDialog,
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS9 = <FormGroup<Step9Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

  openLearnmore(): void {
    const dialogRef = this.dialog.open(LearnMoreComponent, {
      width: '100%',
      maxWidth: '32rem'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('');
    });
  }

  handleRadiobtn(index: any): void {
    this.isSelected = index;
    console.log(this.isSelected);
    this.formRegPropS9.controls['discounts']?.setValue(this.adddiscounts[index].value)
  }

  public handleSelectDiscount(e: Event) {
    // const discount: FormArray = <FormArray>this.formRegPropS9.get('discounts')
    // let target: HTMLInputElement = <HTMLInputElement>e.target!
    // if(target.checked) {
    //   let i = this.adddiscounts.findIndex((j: any) => j.value === target.value)
    //   discount.push(new FormControl({
    //     percentage: this.adddiscounts[i].label,
    //     name: this.adddiscounts[i].name,
    //     description: this.adddiscounts[i].label
    //   }))
    // } else{
    //   let i: number = 0
    //   discount.controls.forEach((ctrl: AbstractControl) => {
    //     if(ctrl.value === target.value) {
    //       discount.removeAt(i)
    //       return
    //     }
    //     i++
    //   })
    // }
  }





}
