import { BasicUtilService } from './../../services/basic-util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProfileModalComponent } from './component/create-profile-modal/create-profile-modal.component';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss'],
  animations:[fadeInAnimation]
})
export class UsersProfileComponent implements OnInit, OnDestroy {

  public profile!: any;
  public auth!: any;
  public properties!: any;
  public fullName: string = ''
  public userDuration: string = ''

  private _claims!: ITokenClaims
  private _sub: Subscription = new Subscription()

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _user: UserService,
    private _token: TokenService,
    private _basicUtil: BasicUtilService
  ) { }

  ngOnInit(): void {
    this._claims = this._token.decodedToken()
    this._getUserProfile(this._claims.sub)
  
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }
  
  openCreateProfileDialog(): void {
    
    const dialogRefSignup = this.dialog.open(CreateProfileModalComponent, {
      width: '100vw',  // Full width on small screens
      // maxHeight: '100vh',
      height: '100vh',
      maxWidth: '1000px',  // Max width for larger screens
      panelClass: 'custom-dialog-container',  // Add a custom class for further styling
      data: { ...this.profile, email: this.auth.email }
    });
    
    dialogRefSignup.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
      this._getUserProfile(this._claims.sub)
    });

    console.log(this.profile)
  }

  navigateToBookStaycation() {
    this.router.navigate(['main/staycation-details']);
    console.log("Click");
  }

  private _getUserProfile(id: string) {
    this._sub.add(this._user.getUserProfile(id).subscribe({
      next: (res: any) => {
        this.profile = {
          ...res.profile,
          img: this._basicUtil.setImgUrl(res.profile.img)
        }
        this.auth = {
          email: res.auth.email,
          access: res.auth.access.join('/')
        }
        this.properties = res.properties.map((prop: any) => {
          return {
            ...prop,
            cover: this._basicUtil.setImgUrl(prop.media.cover),
            imgs: prop.media.imgs.map((img: string) => this._basicUtil.setImgUrl(img))
          }
        })
        this.fullName = this._basicUtil.constructName(res.profile.name)
        // this.userDuration = moment(res.)
        this.userDuration = this._basicUtil.calculateUserDuration(res.profile.createdAt)
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }
}
