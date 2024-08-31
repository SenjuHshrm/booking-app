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

  private manager!: Manager;
  private MainSocket!: Socket;
  private NotifSocket!: Socket;
  private MsgSocket!: Socket;

  constructor() { }

  public initializeManager() {
    this.manager = new Manager(environment.api, {
      autoConnect: true,
      transports: ['websocket', 'polling']
    })
  }

  public initMain() {
    this.MainSocket = this.manager.socket('/')
  }

  public initNotif() {
    this.NotifSocket = this.manager.socket('/notification')
  }

  public initMsg() {
    this.MsgSocket = this.manager.socket('/message')
  }

  public listen(namespace: keyof typeof SocketNamespace, e: string): Observable<any> {
    return new Observable((sub: any) => {
      this[namespace].on(e, (data: any) => {
        sub.next(data)
      })
    })
  }

  public emit(namespace: keyof typeof SocketNamespace, e: string, data: any): void {
    this[namespace].emit(e, data)
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

  public disconnectMain() {
    this.MainSocket.disconnect()
  }

  public disconnectNotif() {
    this.NotifSocket.disconnect()
  }

  public disconnectMsg() {
    this.MsgSocket.disconnect()
  }

}
