import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment'
import { Socket, Manager } from 'socket.io-client'

export enum DefaultEventName {
  'close',
  'error',
  'open',
  'packet',
  'ping',
  'reconnect',
  'reconnect_attempt',
  'reconnect_error',
  'reconnect_failed',
}

export enum SocketNamespace {
  'MainSocket', 'NotifSocket', 'MsgSocket'
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socketNamspace: { namespace: 'MainSocket' | 'NotifSocket' | 'MsgSocket', eventPrefix: string }[] = [
    {
      namespace: 'MainSocket',
      eventPrefix: 'main'
    },
    {
      namespace: 'NotifSocket',
      eventPrefix: 'notif'
    },
    {
      namespace: 'MsgSocket',
      eventPrefix: 'msg'
    }
  ]

  private manager: Manager = new Manager(environment.api, {
    autoConnect: true,
    transports: ['websocket', 'polling']
  });
  private MainSocket: Socket = this.manager.socket('/')
  private NotifSocket: Socket = this.manager.socket('/notification')
  private MsgSocket: Socket = this.manager.socket('/message')

  constructor() { }

  public listen(namespace: keyof typeof SocketNamespace, e: string): Observable<any> {
    return new Observable((sub: any) => {
      this[namespace].on(e, (data: any) => {
        sub.next(data)
      })
    })
  }

  public defaultEvent(event: keyof typeof DefaultEventName): Observable<any> {
    return new Observable((sub: any) => {
      this.MainSocket.io.on(event, (attempt: number) => {
        sub.next(attempt)
      })
      this.NotifSocket.io.on(event, (attempt: number) => {
        sub.next(attempt)
      })
      this.MsgSocket.io.on(event, (attempt: number) => {
        sub.next(attempt)
      })
    })
  }

  public defaultEventMain(e: keyof typeof DefaultEventName): Observable<any> {
    return new Observable((sub: any) => {
      this.MainSocket.io.on(e, (attempt: number) => {
        sub.next(attempt)
      })
    })
  }

  public defaultEventMsg(e: keyof typeof DefaultEventName): Observable<any> {
    return new Observable((sub: any) => {
      this.MsgSocket.io.on(e, (attempt: number) => {
        sub.next(attempt)
      })
    })
  }

  public defaultEventNotif(e: keyof typeof DefaultEventName): Observable<any> {
    return new Observable((sub: any) => {
      this.NotifSocket.io.on(e, (attempt: number) => {
        sub.next(attempt)
      })
    })
  }

  public emit(namespace: keyof typeof SocketNamespace, e: string, data: any): void {
    this[namespace].emit(e, data)
  }

  public isConnected(): boolean {
    return this.MainSocket.connected
  }

  public disconnected(): boolean {
    return this.MainSocket.disconnected;
  }

  public disconnect(): void {
    this.MainSocket.disconnect()
    this.NotifSocket.disconnect()
    this.MsgSocket.disconnect()
  }
}
