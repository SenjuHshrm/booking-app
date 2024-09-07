import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-your-trips',
  templateUrl: './your-trips.component.html',
  styleUrls: ['./your-trips.component.scss'],
  animations: [fadeInAnimation]
})
export class YourTripsComponent implements OnInit {


  selectedTab: string = 'pending-trip';

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
  }
  isActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }

 selectTab(tab: string): void {
    this.selectedTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }


}
