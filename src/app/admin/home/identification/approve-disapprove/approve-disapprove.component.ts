import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-approve-disapprove',
  templateUrl: './approve-disapprove.component.html',
  styleUrls: ['./approve-disapprove.component.scss'],
})
export class ApproveDisapproveComponent {
  public isLoading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ApproveDisapproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _util: BasicUtilService,
    private _user: UserService,
    private _auth: AuthService
  ) {}

  handleClose(success: boolean, data?: any, status?: any): void {
    if (this.isLoading) return;
    let result: any = { success };
    if (data) {
      result.data = data;
      result.status = status;
    }
    this.dialogRef.close({ result });
  }

  handleChangeStatus(): void {
    this.isLoading = true;
    const status = this.data.action === 'approve' ? 'approved' : 'rejected';
    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap((x) => this._user.updateVerificationStatus(status, this.data._id, x.token)),
          catchError((e) => e)
        )
        .subscribe({
          next: (res: any) => {
            this.isLoading = false
            this.handleClose(true, this.data, status)
          },
          error: (e) => {
            this.isLoading = false
          }
        })
    );
    // this.subscription.add(
    //   this._user.updateVerificationStatus(status, this.data._id).subscribe({
    //     next: (res) => {
    //       this.isLoading = false;
    //       this.handleClose(true, this.data, status);
    //     },
    //     error: (error) => {
    //       this.isLoading = false;
    //     },
    //   })
    // );
  }

  get frontIdSrc(): string {
    return this._util.setImgUrl(this.data.idFront);
  }

  get backIdSrc(): string {
    return this._util.setImgUrl(this.data.idBack);
  }

  get fullName(): string {
    return this._util.constructName(this.data.userInfo[0].name);
  }
}
