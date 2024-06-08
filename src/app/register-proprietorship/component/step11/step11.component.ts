import { GlobalStaticService } from './../../../services/global-static.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step11Form } from '../../register-proprietorship';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

export const customTooltipOptions = {
  showDelay: 500,
  hideDelay: 500,
  touchedHideDelay: 500
}

@Component({
  selector: 'app-step11',
  templateUrl: './step11.component.html',
  styleUrls: ['./step11.component.scss'],
  animations: [fadeInAnimation],
})
export class Step11Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS11!: FormGroup<Step11Form>;
  public tax: string = '';
  public taxList: { name: string, price: number }[] = []

  private sub: Subscription = new Subscription();

  constructor(
    public regPropFormRoot: FormGroupDirective,
    private globalStatic: GlobalStaticService
  ) { }

  ngOnInit(): void {
    this.formRegPropS11 = <FormGroup<Step11Form>>this.regPropFormRoot.control.get(this.formGroupName)
    this._getTaxStatic()
  }

  public handlePriceChange(e: Event) {
    let target: HTMLInputElement = <HTMLInputElement>e.target!
    let initPrice: number = parseInt(target.value)
    this.taxList.forEach((f: { name: string, price: number }) => {
      initPrice += f.price
    })
    this.formRegPropS11.get('beforeTax')?.setValue(initPrice)
  }

  private _getTaxStatic() {
    this.sub.add(this.globalStatic.getStaticByType('service_fee').subscribe({
      next: (res: { data: any }) => {
        res.data.forEach((f: { name: string, price: number }) => {
          this.taxList.push(f)
          this.tax += `${f.name}: ${f.price}\n\n`
        })
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

}
