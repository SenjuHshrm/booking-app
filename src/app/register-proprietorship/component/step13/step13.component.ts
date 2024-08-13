import { Component } from '@angular/core';

@Component({
  selector: 'app-step13',
  templateUrl: './step13.component.html',
  styleUrls: ['./step13.component.scss']
})
export class Step13Component {

public allowed:any;

toggleSwitch(){

}

// petchildData:any = [
//   {title:'Suitable for children (2-12 years)',description:"You can let guests know that your place isn't suitable for children if there are features that are dangerous for them. Guests will still be able to contact you for more details.", allowed:true},
//   {title:'Suitable for infants (under 2 years)',description:"You can let guests know that your place isn't suitable for infants if there are features that are dangerous for them. Guests will still be able to contact you for more details.", allowed:true},
//   {title:'Pets',description:"You can restrict guests from bringing pets, but you must reasonably accommodate guests that might bring an assistance animal.", allowed:true}
// ]



houseRulesData:any = [
   {title:'Suitable for children (2-12 years)', selected:true},
   {title:'Suitable for infants (under 2 years)', selected:true},
   {title:'Pets', selected:true},
   {title:'No Smoking', selected:true},
   {title:'No events or party', selected:true},
]

}
