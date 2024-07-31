import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-your-trips',
  templateUrl: './your-trips.component.html',
  styleUrls: ['./your-trips.component.scss'],
  animations:[fadeInAnimation]
})
export class YourTripsComponent implements OnInit {

  filteredItems: any[] = [];
  notFound: boolean = false;
  public searchInputs: string = ''



  public propertiesTrips: any[]  = [
    {id:'0',image:'../assets/images/main/staycation-details/gallery1.png',title:'This is house',description:'This good',permonth:1200, status:'Reserved'},
    {id:'1',image:'../assets/images/main/staycation-details/gallery2.png',title:'This is building',description:'This good',permonth:1200, status:'Pending'},
    {id:'2',image:'../assets/images/main/staycation-details/gallery3.png',title:'This is office',description:'This good',permonth:1200, status:'Recent'},
    {id:'3',image:'../assets/images/main/staycation-details/gallery4.png',title:'This is villa',description:'This good',permonth:1200, status:'Not Available'},
    {id:'4',image:'../assets/images/main/staycation-details/gallery5.png',title:'This is home',description:'This good',permonth:1200, status:'Reserved'},
  ];

  
  originalItems: any[] = [...this.propertiesTrips];
  

  constructor(private router: Router,) {

  }

  ngOnInit(): void {
    this.filteredItems = this.propertiesTrips;
  }


  filterItems(query: any): void {
    if (query) {
        this.filteredItems = this.propertiesTrips.filter((item:any) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.permonth.toString().includes(query) ||
            item.status.toLowerCase().includes(query.toLowerCase())
        );
        this.notFound = this.filteredItems.length === 0;
    } else{
      this.filteredItems = [...this.originalItems];
    }
}

  navigateToBookStaycation(id: string): void {
    this.router.navigate(['main/staycation-details', id]);
    console.log("Click");
  }
  

  
  public goToSeacrhList() {
    this.router.navigate(['main/staycation-list']);
  }

  
}
