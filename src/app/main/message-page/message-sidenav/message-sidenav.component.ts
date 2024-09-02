import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageList, RoomMember } from 'src/app/interfaces/message';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message-sidenav',
  templateUrl: './message-sidenav.component.html',
  styleUrls: ['./message-sidenav.component.scss'],
})
export class MessageSidenavComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean = false;
  @Input() togleDrawer!: () => void;
  @Input() limit: number = 20;
  @Input() page: number = 1;

  @Output() setMessages = new EventEmitter<Message[]>();
  @Output() setSelectedId = new EventEmitter<string>();
  @Output() setRoomDetails = new EventEmitter<MessageList>();

  public messageList: MessageList[] = [];
  public activeRoomDetails!: MessageList;

  private subscription: Subscription = new Subscription();
  private token!: ITokenClaims;

  constructor(
    private _message: MessageService,
    private _token: TokenService,
    private _util: BasicUtilService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this.subscription.add(
      this._message.getMessageRoomsByUserId(this.token.sub).subscribe({
        next: (res) => {
          this.messageList = this.sortMessageList(<MessageList[]>res);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  private sortMessageList(data: MessageList[]): MessageList[] {
    return data.sort(
      (a: MessageList, b: MessageList) =>
        new Date(b.lastMsg).getTime() - new Date(a.lastMsg).getTime()
    );
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  public handleGetRoomMessages(id: string, limit: number, page: number): void {
    if (page === 1) this.setMessages.emit([]);

    this.subscription.add(
      this._message.getRoomMessages(id, limit, page).subscribe({
        next: (res) => {
          if (res.length > 0) {
            const details: MessageList | undefined = this.messageList.find(
              (detail) => detail._id === id
            );
            const data: Message[] = this.sortMessage(<Message[]>res);
            this.setMessages.emit(data);
            this.setSelectedId.emit(data[0]._id);
            this.setRoomDetails.emit(details);
            this.activeRoomDetails = <MessageList>details;
            this.page = page;
          }
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  private sortMessage(data: Message[]): Message[] {
    return data.sort(
      (a: Message, b: Message) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public updateRoomData(item: Message): void {
    if (item.type === 'text') {
      this.activeRoomDetails.msgPrev = <string>item.text;
    }

    if (item.type === 'media') {
    }

    this.activeRoomDetails.lastMsg = item.createdAt;
    this.activeRoomDetails.from = item.from._id;
    this.messageList = this.sortMessageList(this.messageList);
  }

  private getOtherMember(members: RoomMember[]): RoomMember {
    const notMe: any = members.find(
      (member: RoomMember) => member._id !== this.token.sub
    );
    return notMe;
  }

  public fullName(members: RoomMember[]): string {
    const notMe: any = this.getOtherMember(members);
    return this._util.constructName(notMe?.name);
  }

  public imgSrc(members: RoomMember[]): string {
    const notMe: any = this.getOtherMember(members);
    return this._util.setImgUrl(notMe?.img);
  }

  public duration(date: string): string {
    return this._util.calculateMessageDuration(date);
  }

  public isAuthor(data: MessageList): boolean {
    return data.from === this.token.sub;
  }
}
