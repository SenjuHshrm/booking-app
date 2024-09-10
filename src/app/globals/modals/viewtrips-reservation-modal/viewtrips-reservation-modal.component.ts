import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { fadeInAnimation } from '../../fadein-animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidationTripsModalComponent } from '../../../main/your-trips/modal/validation-trips-modal/validation-trips-modal.component';
import { CancelReasonModalComponent } from 'src/app/main/your-trips/modal/cancel-reason-modal/cancel-reason-modal.component';
import { Router } from '@angular/router';


SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-viewtrips-reservation-modal',
  templateUrl: './viewtrips-reservation-modal.component.html',
  styleUrls: ['./viewtrips-reservation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation],
})
export class ViewtripsReservationModalComponent implements OnInit {


  public yourTrips:any[] = [
    { image: '../assets/images/main/staycation-details/gallery1.png'},
    { image: '../assets/images/main/staycation-details/gallery1.png'},
    { image: '../assets/images/main/staycation-details/gallery1.png'},
    { image: '../assets/images/main/staycation-details/gallery1.png'},
    { image: '../assets/images/main/staycation-details/gallery1.png'},
  ]

  public reserveDetails:any[] =[
    {bookedguest:'Juan Dela Cruz',bookeddate:'September 15, 2024',checkin:'September 15, 2024',checkout:'September 20, 2024', numberguest:'5'}
  ]

  public paymentDetails:any[] =[
    {bookedguest:'Juan Dela Cruz',bookeddate:'September 15, 2024',checkin:'September 15, 2024',checkout:'September 20, 2024', numberguest:'5'}
  ]

  constructor(
    public dialogRef: MatDialogRef<ViewtripsReservationModalComponent>,
    public dialog:MatDialog,
    private router: Router
  ){}
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  ngOnInit() {}
   
  
  public validCancel(): void {
    const dialogRef = this.dialog.open(ValidationTripsModalComponent,{
      panelClass:'custom-cancell-dialog',
      width:'100%',
      maxWidth:'45rem',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result = 'confirm'){
        this.reasonCancel();
      }else{
        this.closeDialog();
      }
    });
    
  }

  private reasonCancel(): void {
    const dialogRef = this.dialog.open(CancelReasonModalComponent,{
      panelClass:'custom-cancell-dialog',
      width:'100%',
      height:'fit-content',
      maxHeight:'25rem',
      maxWidth:'45rem',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    
  }

  public goToSearchList(): void {
    this.router.navigate(['main/staycation-list']);
    this.closeDialog()
  }

  

  closeDialog(): void {
    this.dialogRef.close();
  }

}


