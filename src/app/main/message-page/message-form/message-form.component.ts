import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { IMessageInput, MessageList } from 'src/app/interfaces/message';
import { ITokenClaims } from 'src/app/interfaces/token';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit {
  @Input() roomDetails: MessageList | null = null;
  @Input() selectedRoomId: string = '';

  public token!: ITokenClaims;
  public isLoading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _message: MessageService,
    private _token: TokenService
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

  private getOtherMember(members: any): any {
    const notMe: any = members.find(
      (member: any) => member._id !== this.token.sub
    );
    return notMe;
  }

  onSubmit(form: FormGroup): void {
    if (this.selectedRoomId === '') return;
    if (!form.valid) return;
    this.isLoading = true;
    const formData = form.getRawValue();
    const messageData: IMessageInput = {
      from: this.token.sub,
      type: 'text',
      text: formData.message,
    };

    const notMe = this.getOtherMember(this.roomDetails?.members);
    const id = notMe?._id;

    this.subscription.add(
      this._message.sendMessage(messageData, id).subscribe({
        next: (res) => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      })
    );
  }
}
