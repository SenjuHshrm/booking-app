import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserProfile } from 'src/app/interfaces/profile';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile-modal',
  templateUrl: './view-profile-modal.component.html',
  styleUrls: ['./view-profile-modal.component.scss'],
})
export class ViewProfileModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  public profile!: IUserProfile;

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private dialogRef: MatDialogRef<ViewProfileModalComponent>,
    public util: BasicUtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.getUserProfile(this.id).subscribe({
      next: (res) => {
        this.profile = {
          ...res.profile,
          img: this.util.setImgUrl(res.profile.img),
          email: res.auth.email,
          userType: res.auth.access[0],
          properties: res.properties || [],
        };

        if (res.properties.length > 0) {
          this.profile.properties = res.properties.map((prop: any) => {
            return {
              ...prop,
              cover: this.util.setImgUrl(prop.cover),
              imgs: prop.genImgList.map((img: string) =>
                this.util.setImgUrl(img)
              ),
            };
          });
        }
      },
      error: () => {},
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  navigateToBookStaycation() {
    this.router.navigate(['main/staycation-details']);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
