import { TokenService } from './../../services/token.service';
import { ITokenClaims } from './../../interfaces/token';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
  animations: [fadeInAnimation]
})
export class NotificationPageComponent implements OnInit, OnDestroy {

  private _claims: ITokenClaims | string = ''
   today:any = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

 dataNotif: any =[
    {avatar:'../assets/images/main/notification/taragologo.svg', title:'Booking Confirmation',desc:"Your booking at 'Cozy Downtown Apartment' is confirmed! Check-in is on September 5, 2024. Looking forward to hosting you!",date: this.today},
    {avatar:'../assets/images/main/notification/taragologo.svg', title:'Booking Request',desc:"New booking request: John Doe wants to stay at your 'Beachfront Villa' from October 12-15, 2024. Respond within 24 hours.",date: this.today},
    {avatar:'../assets/images/main/notification/taragologo.svg', title:'Booking Cancellation',desc:"Your booking at 'Mountain Retreat' for October 20-23, 2024, has been canceled by the host. You’ve been fully refunded.",date: this.today},
    {avatar:'../assets/images/main/notification/taragologo.svg', title:'Payment Received',desc:"Payment received: ₱12,500 for your guest’s stay at 'City View Loft'. The amount will be deposited into your account shortly.",date: this.today},
  ]

  constructor(
    private location: Location,
    private _socket: SocketService,
    private _token: TokenService
  ) { }

  ngOnInit(): void {
    this._claims = <ITokenClaims>this._token.decodedToken()
    this._initSocket()
  }

  ngOnDestroy(): void {
    this._socket.disconnectNotif()
  }

  goBack() {
    this.location.back();
  }

  private _initSocket() {
    this._socket.initNotif()
    this._socket.emit('NotifSocket', 'notif:join', this._claims.sub)
    this._socket.listen('NotifSocket', 'disconnect').subscribe(() => {})

    this._socket.defaultEventNotif('reconnect_attempt').subscribe((attempt: number) => {})

    this._socket.defaultEventNotif('reconnect').subscribe(() => {
      this._socket.emit('NotifSocket', 'notif:join', this._claims.sub)
    })
  }

  deleteCard(index: number) {
    this.dataNotif.splice(index, 1);  
  }
  
}
