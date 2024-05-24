import { Component } from '@angular/core';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss']
})
export class Step6Component {
  uploadedImages: string[] = [];

    onFileSelected(event: any): void {
      const files: FileList = event.target.files;
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImages.push(e.target.result);
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
}
