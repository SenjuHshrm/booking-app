import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../../../services/auth.service';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { IMessageInput } from 'src/app/interfaces/message';
import { IUserProfile } from 'src/app/interfaces/profile';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-guest-modal',
  templateUrl: './message-guest-modal.component.html',
  styleUrls: ['./message-guest-modal.component.scss'],
})
export class MessageGuestModalComponent implements OnInit, OnDestroy {
  public token!: ITokenClaims;
  public authData!: any;
  public isLoading: boolean = false;
  public isDataLoading: boolean = false;

  private subscription: Subscription = new Subscription();

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

  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MessageGuestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _token: TokenService,
    private userService: UserService,
    public util: BasicUtilService,
    private messageService: MessageService,
    private _auth: AuthService
  ) {
    this.token = <ITokenClaims>this._token.decodedToken();
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    this.subscription.add(
      this.userService.getUserProfile(this.token.sub).subscribe({
        next: (res) => {
          this.authData = res;
          this.isDataLoading = false;
        },
        error: ({ error }) => {
          this.isDataLoading = false;
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );

    this.messageForm = this.fb.group({
      message: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
    });
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  closeDialogMessage(): void {
    if (this.isLoading) return;
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const formData = form.getRawValue();
    const messageData: IMessageInput = {
      from: this.token.sub,
      type: 'text',
      text: formData.message,
    };

    const id: string = <string>this.data._id;

    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this.messageService.messageProprietor(messageData, id, x.token)),
          catchError(e => e)
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.closeDialogMessage();
          },
          error: (error) => {
            this.isLoading = false;
          },
        })
    );
  }

  get proprietorName(): string {
    return this.util.constructName(this.authData.profile.name);
  }

  get proprietorImage(): string {
    const src = this.token.img;
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this.util.setImgUrl(src);
  }

  get guestName(): string {
    return this.data.fullName;
  }

  get guestImage(): string {
    const src = this.data.img;
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this.util.setImgUrl(src);
  }
}
