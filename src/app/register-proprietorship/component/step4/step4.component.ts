import { Component } from '@angular/core';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component {
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
