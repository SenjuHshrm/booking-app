import { Component, Input, OnInit } from '@angular/core';


interface Item{
  imageSrc:string,
  imageAlt:string
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
   
  @Input() galleryData:Item[] = [];
  @Input() showCount = false;

  previewImage = false;
  showMask = false;
  currentLightboxImage: Item = this.galleryData[0];
  currentIndex = 0;
  controls= true;
  totalImageCount = 0;
 
  constructor() {}
  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length;
  }

  onPreviewimage(index:number):void{
    this.showMask=true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
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
}

