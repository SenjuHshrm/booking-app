import { Component } from '@angular/core';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component {
  amenities:any=[
    {placeamenities:"Wifi"},
    {placeamenities:"TV"},
    {placeamenities:"Kitchen"},
    {placeamenities:"Washer"},
    {placeamenities:"Free parking on premises"},
    {placeamenities:"Paid parking on premises"},
    {placeamenities:"Air conditioning"},
    {placeamenities:"Dedicated workspace"},
  ];

}
