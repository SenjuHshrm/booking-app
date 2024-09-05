import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../camera/camera.component';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { ITokenClaims } from 'src/app/interfaces/token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss'],
})
export class CapturePhotoComponent implements OnInit, OnDestroy {
  @Output() setIsLoading = new EventEmitter<boolean>();
  @Output() setNewStatus = new EventEmitter<string>();

  frontFile: File | null = null;
  backFile: File | null = null;

  frontPreview: File | null = null;
  backPreview: File | null = null;

  frontFilename: string = '';
  backFilename: string = '';

  validIDType: any = [
    { _ids: 'Passport' },
    { _ids: "Driver's License" },
    { _ids: 'Identity Card' },
  ];

  type: string = 'Passport';
  imgPlaceholder: string = `assets/images/customer-dashboard/create-listing/cameraadd.png`;

  subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  token!: ITokenClaims;

  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private _user: UserService,
    private _token: TokenService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  handleCaptureCamera(type: string): void {
    if (this.isLoading) return;

    const camera = this.dialog.open(CameraComponent, {
      disableClose: true,
      data: type,
    });

    camera.afterClosed().subscribe((res) => {
      if (res.success) {
        const { file, preview, type, name } = res;
        console.log(name);
        if (type === 'front') {
          this.frontFile = file;
          this.frontPreview = preview;
          this.frontFilename = name;
        }

        if (type === 'back') {
          this.backFile = file;
          this.backPreview = preview;
          this.backFilename = name;
        }
      }
    });
  }

  onSubmit() {
    if (this.frontFile && this.backFile && this.type !== '') {
      this.isLoading = true;
      this.setIsLoading.emit(true);

      const idFormData = new FormData();
      idFormData.append('id', this.token.sub);
      idFormData.append('user', this.token.sub);
      idFormData.append('type', this.type);
      idFormData.append('status', 'pending');
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
            this.isLoading = false;
            this.setIsLoading.emit(false);
            this._snack.open(error.error.code, '', { duration: 1000 });
          },
        })
      );
    } else {
      alert('Please upload both front and back views of the ID.');
    }
  }
}
