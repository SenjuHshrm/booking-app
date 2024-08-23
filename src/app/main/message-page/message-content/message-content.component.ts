import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss'],
})
export class MessageContentComponent implements AfterViewInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.messageContainer.nativeElement;
    container.addEventListener('scroll', this.onScroll.bind(this));
    console.log('2 KEMEBELZ: ', container);
  }

  private onScroll(): void {
    const container = this.messageContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    console.log('Scroll Top:', scrollTop);
    console.log('Scroll Height:', scrollHeight);
    console.log('Client Height:', clientHeight);

    // Calculate the scroll position relative to the bottom:
    const scrollPositionFromBottom = scrollHeight - (scrollTop + clientHeight);
    console.log('Scroll Position from Bottom:', scrollPositionFromBottom);
  }
}
