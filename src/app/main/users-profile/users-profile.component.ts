import { BasicUtilService } from './../../services/basic-util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProfileModalComponent } from './component/create-profile-modal/create-profile-modal.component';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss'],
  animations: [fadeInAnimation],
})
export class UsersProfileComponent implements OnInit, OnDestroy {
  public profile!: any;
  public auth!: any;
  public properties!: any;
  public fullName: string = '';
  public userDuration: string = '';

  private _claims!: ITokenClaims;
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _user: UserService,
    private _token: TokenService,
    private _basicUtil: BasicUtilService
  ) {}

  ngOnInit(): void {
    this._claims = <ITokenClaims>this._token.decodedToken();
    this._getUserProfile(this._claims.sub);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  openCreateProfileDialog(): void {
    const dialogRefSignup = this.dialog.open(CreateProfileModalComponent, {
      width: '100%',
      maxWidth: '65rem',
      height: '100%',
      maxHeight: '55rem',
      data: { ...this.profile, email: this.auth.email },
    });

    dialogRefSignup.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
      this._getUserProfile(this._claims.sub);
    });

    // console.log(this.profile)
  }

  navigateToBookStaycation() {
    this.router.navigate(['main/staycation-details']);
    console.log('Click');
  }

  private _getUserProfile(id: string) {
    this._sub.add(
      this._user.getUserProfile(id).subscribe({
        next: (res: any) => {
          this.profile = {
            ...res.profile,
            img: this._basicUtil.setImgUrl(res.profile.img),
          };
          this.auth = {
            email: res.auth.email,
            access: res.auth.access.join('/'),
          };
          this.properties = res.properties.map((prop: any) => {
            return {
              ...prop,
              cover: this._basicUtil.setImgUrl(prop.cover),
              imgs: prop.genImgList.map((img: string) =>
                this._basicUtil.setImgUrl(img)
              ),
            };
          });
          this.fullName = this._basicUtil.constructName(res.profile.name);
          // this.userDuration = moment(res.)
          this.userDuration = this._basicUtil.calculateUserDuration(
            res.profile.createdAt
          );
        },
        error: ({ error }: HttpErrorResponse) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
