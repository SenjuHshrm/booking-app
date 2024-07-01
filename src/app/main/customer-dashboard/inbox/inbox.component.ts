import { Component, OnInit, Renderer2 } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  animations:[fadeInAnimation]
})

export class InboxComponent implements OnInit{
   
  constructor(private renderer: Renderer2) {
    
  }

  public currentPath:any;
  public isVisible:any = null;
  public windowWidth: any = null;
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
