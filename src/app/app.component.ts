import { ITokenClaims } from './interfaces/token';
import { TokenService } from './services/token.service';
import { SocketService } from './services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, TeardownLogic, forkJoin } from 'rxjs';

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
    private _token: TokenService
  ) { }

  ngOnInit(): void {
    this._claims = this._token.decodedToken()
    if(this._claims !== '') {
      this._initSocket()
    }
  }

  private _initSocket() {

    let _socket: SocketService = new SocketService()

    this._joinRoom(_socket)

    let listenDisconnectMain: TeardownLogic = _socket.listen('MainSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    let listenDisconnectMsg: TeardownLogic = _socket.listen('MsgSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    let listenDisconnectNotif: TeardownLogic = _socket.listen('NotifSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    let listenReconnectedMain: TeardownLogic = _socket.defaultEventMain('reconnect').subscribe(() => {
      this.isDisconnected = false
      _socket.emit('MainSocket', 'main:join', this._claims.sub)
    })

    let listenReconnectedMsg: TeardownLogic = _socket.defaultEventMsg('reconnect').subscribe(() => {
      this.isDisconnected = false
      _socket.emit('MsgSocket', 'msg:join', this._claims.sub)
    })

    let listenReconnectedNotif: TeardownLogic = _socket.defaultEventNotif('reconnect').subscribe(() => {
      this.isDisconnected = false
      _socket.emit('NotifSocket', 'notif:join', this._claims.sub)
    })

    this._listenReconnect(_socket)

    let socketEvents: TeardownLogic[] = [listenDisconnectMain, listenDisconnectMsg, listenDisconnectNotif, listenReconnectedMain, listenReconnectedMsg, listenReconnectedNotif]

    socketEvents.forEach((tdl: TeardownLogic) => this._sub.add(tdl))

  }

  private _joinRoom(_socket: SocketService) {
    _socket.socketNamspace.forEach((val: { namespace: 'MainSocket' | 'NotifSocket' | 'MsgSocket', eventPrefix: string }) => {
      _socket.emit(val.namespace, `${val.eventPrefix}:join`, this._claims.sub)
    })
    this.isDisconnected = false
  }

  private _listenReconnect(_socket: SocketService) {
    let rMain$ = _socket.defaultEventMain('reconnect_attempt')
    let rMsg$ = _socket.defaultEventMsg('reconnect_attempt')
    let rNotif$ = _socket.defaultEventNotif('reconnect_attempt')
    forkJoin([ rMain$, rMsg$, rNotif$ ]).subscribe(([ main, msg, notif ]) => {
      console.log(main, msg, notif)
      this.isDisconnected = true
    })
  }
}
