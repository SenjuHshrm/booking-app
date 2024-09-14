import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../../../services/auth.service';
import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ITokenClaims } from '../../../../../../interfaces/token';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrorMessage } from '../../../../../../interfaces/input-error-message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from '../../../../../../../../src/app/services/token.service';
import { UserService } from '../../../../../../../../src/app/services/user.service';
import { BasicUtilService } from '../../../../../../../../src/app/services/basic-util.service';
import { MessageService } from '../../../../../../../../src/app/services/message.service';
import { IMessageInput } from '../../../../../../../../src/app/interfaces/message';

@Component({
  selector: 'app-trip-message-host',
  templateUrl: './trip-message-host.component.html',
  styleUrls: ['./trip-message-host.component.scss'],
})
export class TripMessageHostComponent implements OnInit, OnDestroy {
  public token!: ITokenClaims;
  public authData!: any;
  public proprietorData!: any;

  public isLoading: boolean = false;
  public authLoading: boolean = false;
  public hostLoading: boolean = false;

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TripMessageHostComponent>,
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
    this.authLoading = true;
    this.subscription.add(
      this.userService.getUserProfile(this.token.sub).subscribe({
        next: (res) => {
          this.authData = res;
          this.authLoading = false;
        },
        error: () => (this.authLoading = false),
      })
    );

    this.hostLoading = true;
    this.subscription.add(
      this.userService.getUserProfile(this.data).subscribe({
        next: (res) => {
          this.proprietorData = res;
          this.hostLoading = false;
        },
        error: () => (this.hostLoading = false),
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
    if (this.isLoading || this.authLoading || this.hostLoading) return;
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;
    this.isLoading = true;
    const formData = form.getRawValue();
    const messageData: IMessageInput = {
      from: this.token.sub,
      type: 'text',
      text: formData.message,
    };

    const id: string = <string>this.data;

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

  get fullName(): string {
    return this.util.constructName(this.authData.profile.name);
  }

  get authImage(): string {
    return this.token.img;
  }

  get hostName(): string {
    return this.util.constructName(this.proprietorData.profile.name);
  }

  get hostImage(): string {
    const src = this.proprietorData.profile.img;
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this.util.setImgUrl(src);
  }
}
