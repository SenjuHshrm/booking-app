import { Component, ViewEncapsulation} from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LearnMoreComponent } from 'src/app/register-proprietorship/component/step9/learn-more/learn-more.component';
import { LongtermLearnmoreComponent } from 'src/app/register-proprietorship/component/step12/longterm-learnmore/longterm-learnmore.component';
import { NonRefundLearnmoreComponent } from 'src/app/register-proprietorship/component/step12/non-refund-learnmore/non-refund-learnmore.component';
import { StandardLearnmoreComponent } from 'src/app/register-proprietorship/component/step12/standard-learnmore/standard-learnmore.component';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrls: ['./update-listing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:[fadeInAnimation]
})
export class UpdateListingComponent {

  constructor(
    public dialog:MatDialog,
    private location:Location
  ) {}



//////////////////////////data and variables///////////////////////////////
//all-tab
public selectedTab:any = "tab1"
public isPanelOpen = false;
public tabListingInfo: string ="tab1";
//all-tab

////photo-tour
  public uploadedImagesGeneral: any = [];
  public imgFileGeneral: File[] = [];
  public dataFileGeneral:any = [];

  public uploadedImagesBedroom: any = [];
  public imgFileBedroom: File[] = [];
  public dataFileBedroom:any = [];

  public uploadedImagesOtherCat: any = [];
  public imgFileOtherCat: File[] = [];
  public dataFileOtherCat:any = [];

  public uploadSectionsCatImages: any[] = [];
////photo-tour

////property-type
public isSelected : any = null;
public typeofplace: any = [
  { label:"Entire place", desc:'Guest have the whole place to themselves.', value: 'event_place' },
  { label:"Shared room", desc:'Guest sleep in a room or common area that may be shared with you or others.', value: 'room_shared' },
  { label:"Room only", desc:'Guest have their own room in a home, plus access to shared spaces.', value: 'room' },
];
////property-type

////listingtype-type or describe your place or category
public isCheckedStaycation: any = null;
public isCheckedEvents: any = null;
public defaultPlaces: any = [
  {id:0, placetype: "Resort", value: "Resort", type: 'room, room_shared' },
  {id:1, placetype: "Private Villa", value: "Private Villa", type: 'room, room_shared' },
  {id:2, placetype: "Service Condominium", value: "Service Condominium", type: 'room, room_shared' },
  {id:3, placetype: "Hotel", value: "Hotel", type: 'room, room_shared' },
  {id:4, placetype: "Meeting Room", value: "Meeting Room", type: 'event_place' },
  {id:5, placetype: "Hotel Ballroom", value: "Hotel Ballroom", type: 'event_place' },
  {id:6, placetype: "Restaurant Space", value: "Restaurant Space", type: 'event_place' },
  {id:7, placetype: "Paviilion", value: "Paviilion", type: 'event_place' },
  {id:8, placetype: "Gymnasium", value: "Gymnasium", type: 'event_place' },
];

public stayCations = this.defaultPlaces.slice(0, 4);
public eventsPlaces = this.defaultPlaces.slice(4, 9);
////listingtype-type or describe your placeor or category


// pricing
public price: number = 0;
public tax: number = 0;
public beforeTaxTotal: number = 0
public earningFee: number = 0
public totalEarned: number = 0
public taxList: { feeName: string, price: number, type: string }[] = []
// pricing

//amenities
public isChecked: any = null;
public textValueAmenities: any = null;
public amenities: any = [
  { placeamenities: "Wifi", value: 'Wifi' },
  { placeamenities: "TV", value: 'TV' },
  { placeamenities: "Kitchen", value: 'Kitchen' },
  { placeamenities: "Washer", value: 'Washer' },
  { placeamenities: "Free parking on premises", value: 'Free Parking' },
  { placeamenities: "Paid parking on premises", value: 'Paid Parking' },
  { placeamenities: "Air Conditioning", value: 'AirConditioning' },
  { placeamenities: "Dedicated workspace", value: 'Dedicated Workspace' },
];
//amenities

//instant book
public isSelectedBook: any = null;
public setInstantBook: any = [
  { title: 'Use Instant Book ', desc: 'Guests can book automatically.', value: 'instant'},
  { title: 'Approve or decline requests', desc: 'Guests must ask if they can book.', value: 'for_approval' },
]
//instant book

//does your place have any of these?
public isCheckedOfThese: any = null;
public doesyourplace: any = [
  { doesyourPlace: "Security camera’s" },
  { doesyourPlace: "Weapons" },
  { doesyourPlace: "Dangerous animals" }
]
//does your place have any of these?

//ground/house rules
public isCheckedrules: any = null;
public textValuerules: string = '';
houseRulesData:any = [
  {title:'Suitable for children(2-12 years)', selected:true},
  {title:'Suitable for infants(under 2 years)', selected:true},
  {title:'Pets', selected:true},
  {title:'No Smoking', selected:true},
  {title:'No events or party', selected:true},
]
//ground/house rules

//add discounts
public isCheckeddiscount: any = null;
public addDiscounts: any = [
  { label: 0, name: '0%', desc: 'Do not used discounts.', value: 'discount_0' },
  { label: 20, name: '20% Off', desc: 'Offer discounts for first 3 bookings', value: 'discount_1' },
  { label: 30, name: '30% Off', desc: 'For stays of 7 nights or more', value: 'discount_2' },
  { label: 50, name: '40% Off', desc: 'For stays of 28 nights or more', value: 'discount_3' },
]
//add discounts

//cancellation-policy
public enableNonRefundable: boolean = false;
public isSelectedShort: any ;
public isSelectedLong: any ;

public standardData:any =[
  {value: 'cancel_policy_standard_1', cancellTitle:'Flexible', cancellDesc:'Guest get a full refund they cancel up to a day before check-in.', selected:false},
  {value: 'cancel_policy_standard_2', cancellTitle:'Moderate', cancellDesc:'Guest get a full refund if they cancel up to 5 days before check-in.', selected:false},
  {value: 'cancel_policy_standard_3', cancellTitle:'Firm', cancellDesc:'Guest get a full refund if they cancel up to 30 days before check-in, except in certain cases.', selected:false},
  {value: 'cancel_policy_standard_4', cancellTitle:'Strict', cancellDesc:'Guest get a full refund if they cancel within 48 hours of booking and at least 14 days before check-in.', selected:false},
]

public longtermData:any =[
  {value: 'cancel_policy_lt_1', cancellTitle:'Firm', cancellDesc:'Full refund up to 30 days before check-in. After that, the first 30 days of the stay are non-refundable.', selected:false},
  {value: 'cancel_policy_lt_2', cancellTitle:'Strict', cancellDesc:'Full refund if cancelled within 48 hours of booking and at least 28 days before check-in. After that, the first 30 days of the stay are non-refundable.', selected:false},
]
//cancellation-policy




//////////////////////////functions///////////////////////////////

//all-tab
tabListingInfoTab(_data: any) {
  this.tabListingInfo = _data.tab;
  this.isPanelOpen = false;
  console.log( this.tabListingInfo );
}
  selectTab(_tab:any){
    this.selectedTab = _tab;
  }
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
    console.log(this.isPanelOpen);
  }
  //all-tab


  //close-exit
  closePanel(){
    this.isPanelOpen = false;
  }

  goBack(): void {
    this.location.back();
  }
//close-exit
  

////photo-tour
 addSectionCat() {
  this.uploadSectionsCatImages.push({image:null});
}
////photo-tour


////property-type
handleRadiobtn(index:any): void {
  this.isSelected = index;
}
////property-type

////listingtype-type or describe your place or category
public handleSelectedPlaceType(e: Event, i: number, value: string) {
  this.isCheckedStaycation = (e.target as HTMLInputElement).checked;
  this.isCheckedStaycation = i;
}
  ////listingtype-type or describe your placeor or category

// pricing
  // Function here
// pricing


//amenities
public handleSelectedAmenities(e: Event, indexNum:any) {
  this.isChecked = (e.target as HTMLInputElement).checked;
  this.isChecked = indexNum;
}
checkboxAmenities() {
  // this.amenities.push({placeamenities:this.textValueAmenities, value:this.textValueAmenities});
  if (this.textValueAmenities.trim() !== '') {
    this.amenities.push({placeamenities:this.textValueAmenities, value:this.textValueAmenities});
  }
    this.textValueAmenities = '';   
}
//amenities


//instant book
handleRadiobtnBook(index: any, value: string): void {
  this.isSelected = index;
}
//instant book


//does your place have any of these?

public handleSelectedSecurity(e: Event, indexNum:any) {
  this.isChecked = (e.target as HTMLInputElement).checked;
  this.isChecked = indexNum;
}
//does your place have any of these?


//ground/house rules
addCheckBox() {
  // this.houseRulesData.push({title:this.textValue, selected: true});
  if (this.textValuerules.trim() !== '') {
    this.houseRulesData.push({ title: this.textValuerules, selected: true });
  }
  this.textValuerules = ''; 
}

public handleSelectedRules(e: Event, i: number) {
  this.isCheckedrules = (e.target as HTMLInputElement).checked;
  this.isCheckedrules = i;

}
//ground/house rules


//discount
openLearnmore(): void {
  const dialogRef = this.dialog.open(LearnMoreComponent, {
    width: '100%',
    maxWidth: '32rem'
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('');
  });
}

handleRadiobtnDiscounts(index: any, value: string): void {
  this.isSelected = index;
}
//discount

//cancellation-policy
openNonStandardLearnmore(): void {
  const dialogRef = this.dialog.open(StandardLearnmoreComponent, {
    width: '100%',
    maxWidth: '60rem',
    height: '100%',
    maxHeight:'45rem',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('');
  });
}

openNonRefundLearnmore(): void {
  const dialogRef = this.dialog.open(NonRefundLearnmoreComponent, {
    width: '100%',
    maxWidth: '60rem',
    height: '100%',
    maxHeight:'45rem',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('');
  });
}

openLongTermLearnmore(): void {
  const dialogRef = this.dialog.open(LongtermLearnmoreComponent, {
    width: '100%',
    maxWidth: '60rem',
    height: '100%',
    maxHeight:'45rem',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('');
  });
}

public selectPolicy(i: number, policy: string, value: string) {
  switch(policy) {
    case 'standard':
      this.isSelectedShort = i;
      this.isSelectedLong = -1;
      break;
    case 'lt':
      this.isSelectedLong = i;
      this.isSelectedShort = -1;
  }
}

public setNonRefundable(e: boolean) {
  this.enableNonRefundable = e
}
//cancellation-policy












}
