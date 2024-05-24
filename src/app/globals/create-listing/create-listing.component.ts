import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent {
  constructor(public dialogLogin: MatDialogRef<CreateListingComponent>) { }

  closeDialogCreateListing(): void {
    this.dialogLogin.close();
  }
  

    places:any=[
      {placetype:"House"},
      {placetype:"Appartment"},
      {placetype:"Villa"},
      {placetype:"Hotel"},
      {placetype:"Guest House"},
      {placetype:"Resorts"},
      {placetype:"Container"},
      {placetype:"Farm"},
      {placetype:"Cycladic Home"},
      {placetype:"Casa Partiular"},
      {placetype:"Bed & Breakfast"},
      {placetype:"Boat"},
      {placetype:"Cabin"},
      {placetype:"Barn"},
      {placetype:"Camper/RV"},
    ];

    
    typeofplace:any=[
      {label:"Entire place", desc:'Guest have the whole place to themselves.'},
      {label:"Shared room", desc:'Guest sleep in a room or common area that may be shared with you or others.'},
      {label:"Room only", desc:'Guest have their own room in a home, plus access to shared spaces.'},
    ]

    amenities:any=[
      {placeamenities:"Wifi"},
      {placeamenities:"TV"},
      {placeamenities:"Kitchen"},
      {placeamenities:"Washer"},
      {placeamenities:"Free parking on premises"},
      {placeamenities:"Paid parking on premises"},
      {placeamenities:"Air conditioning"},
      {placeamenities:"Dedicated workspace"},
    ];

    describehouse:any=[
      {describeHouse:"Peaceful"},
      {describeHouse:"Unique"},
      {describeHouse:"Stylish"},
      {describeHouse:"Peaceful"},
      {describeHouse:"Family-friendly"},
      {describeHouse:"Spacious"}
    ];

    doesyourplace:any=[
      {doesyourPlace:"Security Camera’s"},
      {doesyourPlace:"Weapons"},
      {doesyourPlace:"Dangerous Animals"}
    ]

    adddiscounts:any=[
      {label:20, desc:'Offer 20% off your first 3 bookings'},
      {label:30, desc:'For stays of 7 nights or more'},
      {label:50, desc:'For stays of 28 nights or more'},
    ]



    uploadedImages: string[] = [];

    onFileSelected(event: any): void {
      const files: FileList = event.target.files;
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImages.push(e.target.result);
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
}
