import { SocketService } from './../../services/socket.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { last, Subscription } from 'rxjs';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Message, MessageList, RoomMember } from 'src/app/interfaces/message';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { TokenService } from 'src/app/services/token.service';
import { MessageSidenavComponent } from './message-sidenav/message-sidenav.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
  animations: [fadeInAnimation],
})
export class MessagePageComponent implements OnInit, OnDestroy {
  @ViewChild(MessageSidenavComponent)
  messageSideNavComponent!: MessageSidenavComponent;

  isMobile: boolean = false;
  isLoading: boolean = false;
  isLastPage: boolean = false;

  private subscription: Subscription = new Subscription();
  public selectedRoomId: string = '';
  public roomDetails: MessageList | null = null;
  public token!: ITokenClaims;

  public messageList: Message[] = [];

  public limit: number = 20;
  public page: number = 1;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _util: BasicUtilService,
    private _token: TokenService,
    private _socket: SocketService,
    private _message: MessageService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this._initSocket();
    this.subscription.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe((result) => {
          this.isMobile = result.matches;
        })
    );

    this._socket.listen('MsgSocket', 'msg:chat:send').subscribe({
      next: (res) => {
        const message: Message = {
          _id: res._id,
          roomId: res.roomId,
          from: {
            _id: res.from._id,
            name: res.from.name,
            img: res.from.img,
          },
          type: res.type,
          isRead: res.isRead,
          createdAt: res.createdAt,
        };
        if (res.type === 'text') {
          message.text = res.text;
        } else {
          message.media = res.media;
        }
        this.messageList.unshift(message);
        this.messageSideNavComponent.updateRoomData(message);
      },
      error: (error) => {},
    });
  }

  handleUpdateMessageList(newMessage: Message): void {
    this.messageList.unshift(newMessage);
    this.messageSideNavComponent.updateRoomData(newMessage);
  }

  ngOnDestroy(): void {
    this._socket.disconnectMsg();
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
    this._socket.initMsg();
    this._socket.emit('MsgSocket', 'msg:join', this.token.sub);

    this.subscription.add(
      this._socket.listen('MsgSocket', 'disconnect').subscribe(() => {})
    );

    this.subscription.add(
      this._socket
        .defaultEventMsg('reconnect_attempt')
        .subscribe((attempt: number) => {})
    );

    // this.subscription.add(
    //   this._socket.listen('MsgSocket', 'msg:chat:receive').subscribe((res) => {
    //     console.log(res);
    //   })
    // );

    this.subscription.add(
      this._socket.defaultEventMsg('reconnect').subscribe(() => {
        this._socket.emit('MsgSocket', 'msg:join', this.token.sub);
      })
    );
  }

  handleContentScroll(event: any): void {
    const { clientHeight, scrollHeight, scrollTop } = event.target;

    if (
      scrollHeight === Math.abs(scrollTop) + clientHeight &&
      this.isLoading === false
    ) {
      this.isLoading = true;
      this.subscription.add(
        this._message
          .getRoomMessages(
            <string>this.roomDetails?._id,
            this.limit,
            this.page + 1
          )
          .subscribe({
            next: (res) => {
              if (res.length > 0) {
                const data: Message[] = this.sortMessage(<Message[]>res);
                this.messageList = [...this.messageList, ...data];
                this.page = this.page + 1;
                this.isLoading = false;
                return;
              }
              this.isLoading = false;
            },
            error: (error) => {
              console.log(error);
              this.isLoading = false;
            },
          })
      );
    }
  }

  private sortMessage(data: Message[]): Message[] {
    return data.sort(
      (a: Message, b: Message) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
