import { Component } from '@angular/core';
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
export class UsersProfileComponent {
  constructor(public dialog: MatDialog,private router: Router){}

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



  navigateToBookStaycation() {
    this.router.navigate(['main/staycation-details']);
    console.log("Click");
  }
  

  
  public listproperties = [
    {
      image: '/assets/images/main/staycation-list/images/1.jpg',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 1.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 2.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 3.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    }

 
  ];
}
