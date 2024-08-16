import { BasicUtilService } from './../../../services/basic-util.service';
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
  public price: number = 0;
  public tax: number = 0;
  public beforeTaxTotal: number = 0
  public earningFee: number = 0
  public totalEarned: number = 0
  public taxList: { feeName: string, price: number, type: string }[] = []

  private sub: Subscription = new Subscription();

  constructor(
    public regPropFormRoot: FormGroupDirective,
    private _globalStatic: GlobalStaticService,
    private _basicUtil: BasicUtilService
  ) { }

  ngOnInit(): void {
    this.formRegPropS11 = <FormGroup<Step11Form>>this.regPropFormRoot.control.get(this.formGroupName)
    this._getTaxStatic()
    this._getEarnerFee()
  }

  public handlePriceChange(e: Event) {
    let target: HTMLInputElement = <HTMLInputElement>e.target!
    this.price = parseInt(target.value)
    this._getTotalTax(this.price, this.taxList)
    let efp = this.earningFee / 100
    let ef = this.beforeTaxTotal * efp
    this.totalEarned = this.beforeTaxTotal - ef
  }

  private _getTotalTax(price: number, tax: any) {
    this.tax = this._basicUtil.taxTotal(price, tax)
    this.beforeTaxTotal = price + this.tax
    // console.log(this.tax, ' ', this.beforeTaxTotal)
  }

  private _getTaxStatic() {
    this.sub.add(this._globalStatic.getStaticByType('service_fee').subscribe({
      next: (res: { data: any }) => {
        this.taxList = res.data
        this._getTotalTax(this.price, this.taxList)
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  private _getEarnerFee() {
    this.sub.add(this._globalStatic.getStaticByType('earning_fee').subscribe({
      next: (res: any) => {
        this.earningFee = res.data[0].percentage
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

}
