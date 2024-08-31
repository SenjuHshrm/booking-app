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

  avatar: any =[{},{},{},{},{},{},{},{},{},{},{},]

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
  
}
