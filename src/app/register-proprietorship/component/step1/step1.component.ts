import { Component } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  places:any=[
    {placetype:"House"},
    {placetype:"Appartment"},
    {placetype:"Villa"},
    {placetype:"Hotel"},
    {placetype:"Guest House"},
    {placetype:"Resorts"},
    {placetype:"Container"},
    {placetype:"Farm"},
    {placetype:"Cycladic Home"},
    {placetype:"Casa Partiular"},
    {placetype:"Bed & Breakfast"},
    {placetype:"Boat"},
    {placetype:"Cabin"},
    {placetype:"Barn"},
    {placetype:"Camper/RV"},
  ];

}
