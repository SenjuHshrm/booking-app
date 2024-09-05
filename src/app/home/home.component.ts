import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  inject,
} from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../globals/login/login.component';
import { HomeImageGalleryComponent } from '../globals/home-image-gallery/home-image-gallery.component';
import { FaqService } from '../services/faq.service';
import { Subscription } from 'rxjs';
import { IFAQItem } from '../interfaces/faq';
import { CarouselService } from '../services/carousel.service';
import { ICarousel } from '../interfaces/carousel';
import { BasicUtilService } from '../services/basic-util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation],
})
export class HomeComponent implements OnInit {
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _faq: FaqService,
    private _carousel: CarouselService,
    private _util: BasicUtilService
  ) {}

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  selectedOption: any;
  panelOpenState = false;
  public isAuth!: boolean;
  selectedValue: string = '';
  public imageSets: any;
  currentImageIndex = 0;
  intervalId: any;
  public descriptions: any = 'Customer Inquiry';

  public faqs: IFAQItem[] = [];
  public frontCarousels: ICarousel[] = [];
  public backCarousels: ICarousel[] = [];

  private _subs: Subscription = new Subscription();

  ngOnInit() {
    this.handleActiveFAQ();
    this.handleGetCarouselByType('front');
    this.handleGetCarouselByType('back');
    this.activatedRoute.data.subscribe({
      next: (res: any) => {
        this.isAuth = res.isAuth;
      },
    }),
      this.startSlideshow();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  handleActiveFAQ(): void {
    this._subs.add(
      this._faq.getActiveFaq().subscribe({
        next: (res) => {
          this.faqs = <IFAQItem[]>res;
        },
        error: (error) => {
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }

  handleGetCarouselByType(type: string): void {
    this._subs.add(
      this._carousel.getActiveCarouselByType(type).subscribe({
        next: (res) => {
          if (type === 'front') {
            this.frontCarousels =
              res.length > 0 ? <ICarousel[]>res : this.heroImages;
            return;
          }
          this.backCarousels =
            res.length > 0 ? <ICarousel[]>res : this.destinations;
        },
        error: (error) => {
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }

  setSrc(carousel: ICarousel): string {
    if (carousel.isActive) {
      return this._util.setImgUrl('/' + carousel.img);
    }
    return carousel.img;
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  navigateToMain() {
    if (this.isAuth) {
      this.router.navigate(['/', 'main', 'staycation-list']);
    } else {
      this.openLoginDialog();
    }
  }

  private openLoginDialog(): void {
    const dialogRefLogin = this.dialog.open(LoginComponent, {
      panelClass: 'custom-login-modal',
    });

    dialogRefLogin.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = inputElement.value;
  }

  heroImages: ICarousel[] = [
    { img: '../assets/images/home/header/hero/0.jpg', isActive: false },
    { img: '../assets/images/home/header/hero/1.jpg', isActive: false },
    { img: '../assets/images/home/header/hero/2.jpg', isActive: false },
    { img: '../assets/images/home/header/hero/3.jpg', isActive: false },
  ];

  destinations: ICarousel[] = [
    {
      img: '../assets/images/home/section1/Manila.jpg',
      desc: 'Manila',
      isActive: false,
    },
    {
      img: '../assets/images/home/section1/Batangas.jpg',
      desc: 'Batangas',
      isActive: false,
    },
    {
      img: '../assets/images/home/section1/Boracay.jpg',
      desc: 'Boracay',
      isActive: false,
    },
    {
      img: '../assets/images/home/section1/Manila.jpg',
      desc: 'Manila',
      isActive: false,
    },
    {
      img: '../assets/images/home/section1/Batangas.jpg',
      desc: 'Batangas',
      isActive: false,
    },
  ];

  staycationguide: any = [
    {
      title: '  One-to-one guidance from a Proprietor',
      description:
        'We’ll match you with a property owner in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.',
    },
    {
      title: '  One-to-one guidance from a Proprietor',
      description:
        'We’ll match you with a property owner in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.',
    },
    {
      title: '  One-to-one guidance from a Proprietor',
      description:
        'We’ll match you with a property owner in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.',
    },
  ];

  types: any = [
    {
      images: '../assets/images/home/section1/type/resorts.png',
      description: 'Resort',
    },
    {
      images: '../assets/images/home/section1/type/villa.png',
      description: 'Private Villa',
    },
    {
      images: '../assets/images/home/section1/type/condo.png',
      description: 'Service Condominium',
    },
    {
      images: '../assets/images/home/section1/type/hotel.png',
      description: 'Hotel',
    },
    {
      images: '../assets/images/home/section1/type/Hotel Ballroom.jpeg',
      description: 'Hotel BallRoom',
    },
    {
      images: '../assets/images/home/section1/type/Restaurant Space.jpeg',
      description: 'Restaurant Space',
    },
    {
      images: '../assets/images/home/section1/type/Pavillion.jpg',
      description: 'Pavillion',
    },
    {
      images: '../assets/images/home/section1/type/Gymnasium.jpeg',
      description: 'Gymnasium',
    },
    {
      images: '../assets/images/home/section1/type/Meeting Room.jpeg',
      description: 'Meeting Room',
    },
  ];

  options = [
    { label: 'Entire Space', value: '1' },
    { label: 'Private Room', value: '2' },
  ];

  gallery: any[] = [
    {
      imageSrc: '../assets/images/home/gallery/1.jpg',
      imageAlt: 'Gallery Image 1',
    },
    {
      imageSrc: '../assets/images/home/gallery/2.jpg',
      imageAlt: 'Gallery Image 2',
    },
    {
      imageSrc: '../assets/images/home/gallery/3.jpg',
      imageAlt: 'Gallery Image 3',
    },
    {
      imageSrc: '../assets/images/home/gallery/4.jpg',
      imageAlt: 'Gallery Image 4',
    },
    {
      imageSrc: '../assets/images/home/gallery/5.jpg',
      imageAlt: 'Gallery Image 5',
    },
    {
      imageSrc: '../assets/images/home/gallery/6.jpg',
      imageAlt: 'Gallery Image 6',
    },
    {
      imageSrc: '../assets/images/home/gallery/7.jpg',
      imageAlt: 'Gallery Image 7',
    },
    {
      imageSrc: '../assets/images/home/gallery/8.jpg',
      imageAlt: 'Gallery Image 8',
    },
  ];

  //gallery

  public openGallery(): void {
    const dialogRefLogin = this.dialog.open(HomeImageGalleryComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100rem',
      data: { images: this.gallery },
    });

    dialogRefLogin.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  nextImage(event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent triggering the gallery page click
      clearInterval(this.intervalId); // Stop the slideshow when manually navigated
      this.startSlideshow(); // Restart the slideshow
    }
    this.currentImageIndex = (this.currentImageIndex + 1) % this.gallery.length;
  }

  previousImage(event: Event) {
    event.stopPropagation(); // Prevent triggering the gallery page click
    clearInterval(this.intervalId); // Stop the slideshow when manually navigated
    this.startSlideshow(); // Restart the slideshow
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.gallery.length) % this.gallery.length;
  }
  //gallery

  //Swiper
  slideNext() {
    this.swiper?.swiperRef.slideNext(500);
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev(500);
  }
  //Swiper

  gotoGalleryPage(): void {}

  onClickInquire() {
    const emailUrl = this.generateEmailUrl(
      'ucpitconsultancy@gmail.com',
      this.descriptions,
      ''
    );
    window.open(emailUrl, '_blank');
  }

  private generateEmailUrl(to: string, subject: string, body: string): string {
    const baseUrl = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1';
    const fullUrl = `${baseUrl}&to=${to}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    return fullUrl;
  }
}
