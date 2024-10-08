import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ITokenClaims } from './../../../interfaces/token';
import { TokenService } from './../../../services/token.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecuritySettingsModalComponent } from './component/security-settings-modal/security-settings-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss'],
})
export class SecuritySettingsComponent implements OnInit, OnDestroy {
  public email: string = '';

  private _t!: ITokenClaims;
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    public dialog: MatDialog,
    private _user: UserService,
    private _token: TokenService
  ) {}

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken();
    this._getUserDetails();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  openSecModalDialog(): void {
    const dialogRefSec = this.dialog.open(SecuritySettingsModalComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '30rem',
      maxWidth: '35rem',
      data: this._t.sub,
    });

    dialogRefSec.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  private _getUserDetails() {
    this._sub.add(
      this._user.getUserProfile(this._t.sub).subscribe({
        next: (res: any) => {
          console.log(res);
          this.email = res.auth.email;
        },
        error: ({ error }: HttpErrorResponse) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
