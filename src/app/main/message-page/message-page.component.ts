import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
})

export class MessagePageComponent implements OnInit{
   
  constructor(private renderer: Renderer2) {
    
  }

  public currentPath:any;
  public isVisible:any;
  public windowWidth: any;
  public messageList:any = [
    {},{},{},{},{},{},{},{},{},{},{},
  ]

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }


  ngOnInit() {
    this.getWindowSize();
    this.addResizeListener();
  }

  getWindowSize() {
    this.windowWidth = window.innerWidth;
  }

  addResizeListener() {
    this.renderer.listen('window', 'resize', (event) => {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth >= 1000){
        this.isVisible = false;
      }
    });
  }
}
