import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message, RoomMember } from 'src/app/interfaces/message';
import { Fullname } from 'src/app/interfaces/profile';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { SocketService } from 'src/app/services/socket.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss'],
})
export class MessageContentComponent implements OnInit {
  @Input() messageList: Message[] = [];

  public token!: ITokenClaims;

  constructor(
    private _token: TokenService,
    private _util: BasicUtilService,
    private _socket: SocketService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    // this._socket.listen('MsgSocket', 'msg:chat:send').subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (error) => {},
    // });
  }

  public fullName(name: Fullname): string {
    return this._util.constructName(name);
  }

  public imgSrc(src: string): string {
    return this._util.setImgUrl(src);
  }

  public duration(date: string): string {
    return this._util.calculateMessageDuration(date);
  }
}
