import { SocketService } from './../../services/socket.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Message, MessageList, RoomMember } from 'src/app/interfaces/message';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
  animations: [fadeInAnimation],
})
export class MessagePageComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;

  private subscription!: Subscription;
  public selectedRoomId: string = '';
  public roomDetails: MessageList | null = null;
  public token!: ITokenClaims;

  public messageList: Message[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _util: BasicUtilService,
    private _token: TokenService,
    private _socket: SocketService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this._initSocket()
    this.subscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngOnDestroy(): void {
    this._socket.disconnectMsg()
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateMessages(messages: Message[]): void {
    this.messageList = messages;
  }

  updateSelectedRoomId(id: string): void {
    this.selectedRoomId = id;
  }

  updateRoomDetails(details: MessageList): void {
    this.roomDetails = details;
  }

  private getOtherMember(members: any): any {
    const notMe: any = members.find(
      (member: RoomMember) => member._id !== this.token.sub
    );
    return notMe;
  }

  get fullName(): string {
    const notMe: any = this.getOtherMember(this.roomDetails?.members);
    return this._util.constructName(notMe?.name);
  }

  get imgSrc(): string {
    const notMe: any = this.getOtherMember(this.roomDetails?.members);
    return this._util.setImgUrl(notMe?.img);
  }

  public duration(date: string): string {
    return this._util.calculateMessageDuration(date);
  }

  private _initSocket() {
    this._socket.initMsg()
    this._socket.emit('MsgSocket', 'msg:join', this.token.sub)

    this.subscription.add(this._socket.listen('MsgSocket', 'disconnect').subscribe(() => {}))

    this.subscription.add(this._socket.defaultEventMsg('reconnect_attempt').subscribe((attempt: number) => {}))

    this.subscription.add(this._socket.listen('MsgSocket', 'msg:chat:receive').subscribe((res) => {
      console.log(res)
    }))

    this.subscription.add(this._socket.defaultEventMsg('reconnect').subscribe(() => {
      this._socket.emit('MsgSocket', 'msg:join', this.token.sub)
    }))
  }
}
