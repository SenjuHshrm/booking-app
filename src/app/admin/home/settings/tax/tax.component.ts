import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BasicUtilService } from './../../../../services/basic-util.service';
import { GlobalStaticService } from './../../../../services/global-static.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit, OnDestroy {

  @Input() public validation: any;

  public addTaxForm!: FormGroup;
  public taxTableList: any = []
  public taxTableDS!: MatTableDataSource<any>;
  public taxTableDSColumn: string[] = ['name', 'fee', 'type', 'actions']

  private _sub: Subscription = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _gs: GlobalStaticService,
    private _basicUtil: BasicUtilService
  ) { }

  ngOnInit(): void {
    this._initForm()
    this._getGlobalStaticByType('service_fee')
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public addTax(fg: FormGroup, type: string) {
    let val: any = {
      ...fg.value,
      feeName: fg.value.feeName.charAt(0).toUpperCase() + fg.value.feeName.slice(1)
    }
    let data = {
      type,
      values: [
        val
      ]
    }
    this._sub.add(this._gs.addStatic(data).subscribe({
      next: (res: any) => {
        console.log(res)
        this.taxTableList.push({ ...val, name: val.feeName})
        this.taxTableDS = new MatTableDataSource<any>(this.taxTableList)
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }
  
  public removeTax(data: any, i: number) {
    // let fee = { t }
    this._sub.add(this._gs.deleteValueFromStatic(data, 'service_fee').subscribe({
      next: (res: any) => {
        this.taxTableList.splice(i, 1)
        this.taxTableDS = new MatTableDataSource<any>(this.taxTableList)
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  private _getGlobalStaticByType(type: string) {
    this.taxTableList = []
    this._sub.add(this._gs.getStaticByType(type).subscribe({
      next: (res: any) => {
        if(res.data.length > 0) {
          res.data.forEach((val: any) => {
            // Object.keys(val).forEach(key => {
            //   this.taxTableList.push({
            //     name: this._basicUtil.propToReadable(key),
            //     price: val[key]
            //   })
            // })
            this.taxTableList.push(val)
          })
          this.taxTableDS = new MatTableDataSource<any>(this.taxTableList)
        }
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  private _initForm() {
    this.addTaxForm = this._fb.group({
      feeName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      type: new FormControl('', [Validators.required])
    })
  }

}
