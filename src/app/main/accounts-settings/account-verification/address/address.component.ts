import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public verifiedInfo: any;

  constructor(
    public dialog: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.verifiedInfo = data;
    console.log(this.verifiedInfo)
  }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialog.close();
  }

}
