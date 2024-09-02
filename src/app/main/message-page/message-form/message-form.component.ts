import { SocketService } from './../../../services/socket.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import {
  IMessageInput,
  Message,
  MessageList,
} from 'src/app/interfaces/message';
import { ITokenClaims } from 'src/app/interfaces/token';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit {
  @Input() roomDetails: MessageList | null = null;
  @Input() selectedRoomId: string = '';
  @Output() setNewMessage = new EventEmitter<Message>();

  public token!: ITokenClaims;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _token: TokenService,
    private _socket: SocketService
  ) {}

  public messageForm!: FormGroup;

  public messageErrors: FormErrorMessage[] = [
    {
      field: 'message',
      error: 'required',
      message: 'Message is required.',
    },
    {
      field: 'message',
      error: 'maxlength',
      message: 'Message must not exceed 1000 characters.',
    },
  ];

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this.messageForm = this.fb.group({
      message: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
    });
  }

  private getMyName(members: any): any {
    const notMe: any = members.find(
      (member: any) => member._id === this.token.sub
    );
    return notMe;
  }

  onSubmit(form: FormGroup): void {
    if (this.selectedRoomId === '') return;
    if (!form.valid) return;

    const formData = form.getRawValue();
    const messageData: IMessageInput = {
      roomId: <string>this.roomDetails?._id,
      from: this.token.sub,
      type: 'text',
      text: formData.message,
    };
    this._socket.emit('MsgSocket', 'msg:chat:receive', messageData);

    const newMessage: Message = {
      _id: '',
      roomId: <string>this.roomDetails?._id,
      from: {
        _id: this.token.sub,
        name: this.getMyName(this.roomDetails?.members)?.name,
        img: this.token.img,
      },
      type: messageData.type,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    if (messageData.type === 'text') {
      newMessage.text = messageData.text;
    } else {
      // newMessage.media = res.media;
    }
    this.setNewMessage.emit(newMessage);
    form.reset();
  }
}
