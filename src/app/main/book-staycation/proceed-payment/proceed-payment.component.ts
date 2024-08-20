import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-proceed-payment',
  templateUrl: './proceed-payment.component.html',
  styleUrls: ['./proceed-payment.component.scss']
})
export class ProceedPaymentComponent implements OnInit {

  public checkoutURL: SafeHtml = ''

  @HostListener('window:message', ['$event'])
  successPayment(e: any) {
    console.log(e)
  }

  constructor(
    private _mdRef: MatDialogRef<ProceedPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.data.next_action.redirect.url)
    this.checkoutURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.data.next_action.redirect.url)
  }

}
