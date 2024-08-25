import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFAQItem } from 'src/app/interfaces/faq';
import { BasicUtilService } from 'src/app/services/basic-util.service';

@Component({
  selector: 'app-view-faq-modal',
  templateUrl: './view-faq-modal.component.html',
  styleUrls: ['./view-faq-modal.component.scss'],
})
export class ViewFaqModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ViewFaqModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFAQItem,
    private _util: BasicUtilService
  ) {}

  ngOnInit(): void {}

  handleClose(): void {
    this.dialogRef.close();
  }

  get fullName(): string {
    return this._util.constructName(this.data.addedBy.name);
  }

  get imgSrc(): string {
    return this._util.setImgUrl(this.data.addedBy.img);
  }
}
