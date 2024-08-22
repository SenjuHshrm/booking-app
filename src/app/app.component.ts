import { ITokenClaims } from './interfaces/token';
import { TokenService } from './services/token.service';
import { SocketService } from './services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, TeardownLogic } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
// export class AppComponent {
//   title = 'BookingApp'
// }
export class AppComponent implements OnInit {

  public isDisconnected: boolean = false;

  private _claims: ITokenClaims | string = '';
  private _sub: Subscription = new Subscription();

  constructor(
    private _socket: SocketService,
    private _token: TokenService
  ) { }

  ngOnInit(): void {
    this._claims = this._token.decodedToken()
    if(this._claims !== '') {
      this._initSocket()
    }
  }

  private _initSocket() {
    this._joinRoom()

    let listenDisconnectMain: TeardownLogic = this._socket.listen('MainSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    let listenDisconnectMsg: TeardownLogic = this._socket.listen('MsgSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    let listenDisconnectNotif: TeardownLogic = this._socket.listen('NotifSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    let listenReconnectAttempt: TeardownLogic = this._socket.defaultEvent('reconnect_attempt').subscribe((res: number) => {
      console.log(res)
    })

    let listenReconnect: TeardownLogic = this._socket.defaultEvent('reconnect').subscribe((res: number) => {
      this._joinRoom()
    })

    let socketEvents: TeardownLogic[] = [listenDisconnectMain, listenDisconnectMsg, listenDisconnectNotif, listenReconnect, listenReconnectAttempt]

    socketEvents.forEach((tdl: TeardownLogic) => this._sub.add(tdl))

  }

  private _joinRoom() {
    this._socket.socketNamspace.forEach((val: { namespace: 'MainSocket' | 'NotifSocket' | 'MsgSocket', eventPrefix: string }) => {
      this._socket.emit(val.namespace, `${val.eventPrefix}:join`, this._claims.sub)
    })
    this.isDisconnected = false
  }
}
