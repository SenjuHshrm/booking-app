import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ITokenClaims } from 'src/app/interfaces/token';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit, OnDestroy {
  @Output() setIsLoading = new EventEmitter<boolean>();
  @Output() setNewStatus = new EventEmitter<string>();

  private token!: ITokenClaims;

  public idType: string = 'Passport';
  validIDTypes: any = ['Passport', "Driver's License", 'Identity Card'];

  frontFile: File | null = null;
  backFile: File | null = null;

  frontPreview: File | null = null;
  backPreview: File | null = null;

  frontFilename: string = '';
  backFilename: string = '';

  private subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  isLoading: boolean = false;

  constructor(private _token: TokenService, private _user: UserService) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    console.log(this.idType);
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'front') {
          this.frontFile = file;
          this.frontPreview = e.target.result;
          this.frontFilename = `${file.name}`;
        } else if (type === 'back') {
          this.backFile = file;
          this.backPreview = e.target.result;
          this.backFilename = `${file.name}`;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (
      this.frontFile &&
      this.backFile &&
      this.idType !== '' &&
      this.backFilename !== '' &&
      this.frontFilename !== ''
    ) {
      this.isLoading = true;
      this.setIsLoading.emit(true);
      const idFormData: FormData = new FormData();
      idFormData.append('id', this.token.sub);
      idFormData.append('user', this.token.sub);
      idFormData.append('status', 'pending');
      idFormData.append('type', this.idType);
      idFormData.append('idFrontFilename', this.frontFilename);
      idFormData.append('idBackFilename', this.backFilename);
      idFormData.append('idFront', this.frontFile);
      idFormData.append('idBack', this.backFile);

      this.subscription.add(
        this._user.verifyAccountById(idFormData).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.setIsLoading.emit(false);
            this.setNewStatus.emit('pending');
          },
          error: (error) => {
            this._snack.open(error.error.code, '', { duration: 1000 });
            this.isLoading = false;
            this.setIsLoading.emit(false);
          },
        })
      );
    } else {
      alert('Please upload both front and back views of the ID.');
    }
  }
}
