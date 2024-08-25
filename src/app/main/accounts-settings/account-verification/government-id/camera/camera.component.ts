import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  public capturedFile: File | null = null;
  public isLoading: boolean = false;
  public imagePreview: string | null = null;
  private mediaStream: MediaStream | null = null;

  constructor(
    private dialogRef: MatDialogRef<CameraComponent>,
    @Inject(MAT_DIALOG_DATA) private type: string
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.mediaStream = stream;
        this.video.nativeElement.srcObject = stream;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error('Error accessing the camera:', error);
      });
  }

  captureImage() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          this.capturedFile = new File([blob], 'photo.png', {
            type: 'image/png',
          });
          this.convertToBase64(blob);
        }
      }, 'image/png');
    }
  }

  convertToBase64(blob: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagePreview = reader.result as string; // Base64 image
    };
    reader.readAsDataURL(blob); // Convert blob to base64
  }

  uploadImage() {
    if (!this.capturedFile) {
      console.log('No image captured');
      return;
    }
    this.stopCamera();
    this.dialogRef.close({
      success: true,
      file: this.capturedFile,
      preview: this.imagePreview,
      type: this.type,
    });
  }

  stopCamera(): void {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.video.nativeElement.srcObject = null;
    this.mediaStream = null;
  }

  cancelCamera(): void {
    this.stopCamera();
    this.dialogRef.close({
      success: false,
    });
  }
}
