import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProfileModalComponent } from './component/create-profile-modal/create-profile-modal.component';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent {
  constructor(public dialog: MatDialog){}

  personalInfos:any=[
    {label:"Name",info:"No name found"},
    {label:"Surname",info:"No surname found"},
    {label:"Email",info:"No email found"},
    {label:"Contact Number",info:"No contact number found"},
 
  ];


  personalLikes:any=[
    {label:"Hobbies",info:"No Hobbies"},
    {label:"Work",info:"No Work"},
    {label:"Favorite Food",info:"No Favorite Food"},
    {label:"Favorite Place",info:"No BoFavorite Placehol"}
  ];

  
 

  openCreateProfileDialog(): void {
    const dialogRefSignup = this.dialog.open(CreateProfileModalComponent, {
      panelClass: 'custom-signup-modal'
    });
  
    dialogRefSignup.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
