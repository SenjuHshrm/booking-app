import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalStaticService } from './../../../../services/global-static.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-earning',
  templateUrl: './host-earning.component.html',
  styleUrls: ['./host-earning.component.scss'],
})
export class HostEarningComponent implements OnInit, OnDestroy {
  public fg!: FormGroup;
  public perc: number = 0;

  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private _fb: FormBuilder,
    private _sb: MatSnackBar,
    private _gs: GlobalStaticService
  ) {}

  ngOnInit(): void {
    this._getStaticEarningFee();
    this._initForm();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public setFeePercentage(f: FormGroup) {
    console.log({ ...f.value });
    this._sub.add(
      this._gs
        .addStatic({ type: 'earning_fee', values: [{ ...f.value }] })
        .subscribe({
          next: (res: any) => {
            this.perc = this.fg.controls['percentage'].value;
            this._sb.open(`Earning Fee set to ${this.perc}%`, 'OK', {
              duration: 2000,
            });
          },
          error: ({ error }: HttpErrorResponse) => {
            this._sb.open(`Internal Server Error, code ${error.code}`);
          },
        })
    );
  }

  private _initForm() {
    this.fg = this._fb.group({
      percentage: new FormControl('', [Validators.required]),
    });
  }

  private _getStaticEarningFee() {
    this._sub.add(
      this._gs.getStaticByType('earning_fee').subscribe({
        next: (res: any) => {
          this.perc = res.data.length > 0 ? res.data[0].percentage : 0;
        },
        error: (error) => {
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
