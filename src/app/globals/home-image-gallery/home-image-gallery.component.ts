import { Component,Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


interface Item{
  imageSrc:string,
  imageAlt:string
}

@Component({
  selector: 'app-home-image-gallery',
  templateUrl: './home-image-gallery.component.html',
  styleUrls: ['./home-image-gallery.component.scss']
})
export class HomeImageGalleryComponent implements OnInit {
   
  public galleryData: Item[];
  @Input() showCount = false;

  previewImage = false;
  showMask = false;
  currentLightboxImage: Item;
  currentIndex = 0;
  controls= true;
  totalImageCount = 0;
  zIndex:any = 0;
 
  constructor(
    public dialog: MatDialogRef<HomeImageGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: Item[] }
  ) {
    this.galleryData = data.images;
    this.currentLightboxImage = this.galleryData[0];
    console.log("This all images" +   this.galleryData[0].imageSrc )
  }

  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length;
  }

  onPreviewimage(index:number):void{
    this.showMask=true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
    this.zIndex = -1;
  }

  clickNext():void{
     this.currentIndex = this.currentIndex + 1;
     if(this.currentIndex > this.galleryData.length -1){
      this.currentIndex = 0;
     }
     this.currentLightboxImage = this.galleryData[this.currentIndex]
  }

  clickPrev():void{
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0){
      this.currentIndex = this.galleryData.length -1
     }
     this.currentLightboxImage = this.galleryData[this.currentIndex]
  }

  onClose():void{
    this.showMask = false;
  }


  closeDialog(): void {
    this.dialog.close();
  }
  
}

