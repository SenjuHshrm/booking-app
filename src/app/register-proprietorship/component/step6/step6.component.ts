import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Step6Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss']
})
export class Step6Component implements OnInit {

  @Input() public formGroupName!: string;
  @Output() public setCover: EventEmitter<number> = new EventEmitter<number>()
  @Output() public removeCover: EventEmitter<null> = new EventEmitter<null>()
  public formRegPropS6!: FormGroup<Step6Form>;
  public uploadedImages: any = [];
  public imgFile: File[] = []

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS6 = <FormGroup<Step6Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
  
  public onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
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
    this.formRegPropS6.get('img')?.setValue(this.imgFile)
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
    this.formRegPropS6.get('img')?.setValue(this.imgFile)
    if(img.isCover) this.removeCover.emit()
  }
}
