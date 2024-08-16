import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Step6Form } from '../../register-proprietorship';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { environment } from './../../../../environments/environment'

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
  animations: [fadeInAnimation],
})
export class Step6Component implements OnInit {

  @Input() public formGroupName!: string;
  @Output() public setCover: EventEmitter<number> = new EventEmitter<number>()
  @Output() public removeCover: EventEmitter<null> = new EventEmitter<null>()

  public formRegPropS6!: FormGroup<Step6Form>;

  public uploadedImages: any = [];
  public imgFile: File[] = [];

  public uploadedImagesBedroom: any = [];
  public imgFileBedroom: File[] = [];

  public maxImgSize: number = environment.maxImgSize;

  public uploadSectionsCatImages: any[] = [

  ];




  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS6 = <FormGroup<Step6Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
  /////General Photos///
  public onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (parseFloat((files[i].size / 1024 / 1024).toFixed(4)) <= this.maxImgSize) {
          this.imgFile.push(files[i])
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImages.push({
              dataFile: e.target.result,
              isCover: false
            });
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
    this.formRegPropS6.get('genImg')?.setValue(this.imgFile)
  }

  public handleSetCover(e: MouseEvent) {
    e.preventDefault()
    this.uploadedImages = this.uploadedImages.map((m: { dataFile: string, isCover: boolean }) => ({ ...m, isCover: false }))
    let i: number = this.uploadedImages.findIndex((m: { dataFile: string, isCover: boolean }) => m.dataFile === (<HTMLImageElement>e.target).src)
    this.uploadedImages[i].isCover = true
    this.setCover.emit(i)
  }

  public handleRemoveImg(img: any) {
    let i: number = this.uploadedImages.findIndex((m: { dataFile: string, isCover: boolean }) => m.dataFile === img.dataFile)
    this.uploadedImages.splice(i, 1)
    this.imgFile.splice(i, 1)
    this.formRegPropS6.get('genImg')?.setValue(this.imgFile)
    if (img.isCover) this.removeCover.emit()
  }
  /////General Photos///


  ///Where to sleep//
  public onFileSelectedBedroom(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (parseFloat((files[i].size / 1024 / 1024).toFixed(4)) <= this.maxImgSize) {
          this.imgFileBedroom.push(files[i])
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImagesBedroom.push({
              dataFileBedroom: e.target.result,
              isCover: false
            });
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
    this.formRegPropS6.get('bedroom')?.setValue(this.imgFileBedroom)
  }

  public handleRemoveImgBedroom(img: any) {
    let i: number = this.uploadedImagesBedroom.findIndex((m: { dataFileBedroom: string, isCover: boolean }) => m.dataFileBedroom === img.dataFileBedroom)
    this.uploadedImagesBedroom.splice(i, 1)
    this.imgFileBedroom.splice(i, 1)
    this.formRegPropS6.get('bedroom')?.setValue(this.imgFileBedroom)
    if (img.isCover) this.removeCover.emit()
  }
  ///Where to sleep//

  /////Categorarize Uploads///


  addSectionCat() {
    this.uploadSectionsCatImages.push({image:null
    });


  }


  /////Categorarize Uploads///

}
