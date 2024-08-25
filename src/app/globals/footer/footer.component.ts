import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  currentDate: Date; // Declare the property here
  public descriptions: any = "Customer Inquiry";
  
  constructor(private router: Router,) {
    this.currentDate = new Date();  
  }


  public privacyPolicy() {
    window.open('/help-center', '_blank');
  }

  public termsofService() {
    window.open('/help-center', '_blank');
  }

  public companyDetails() {
    window.open('/help-center', '_blank');
  }

  public howToBook() {
    window.open('/help-center', '_blank');
  }


  onClickInquire() {
    const emailUrl = this.generateEmailUrl('ucpitconsultancy@gmail.com', this.descriptions, '');
    window.open(emailUrl, '_blank');
  }

  private generateEmailUrl(to: string, subject: string, body: string): string {
    const baseUrl = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1';
    const fullUrl = `${baseUrl}&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return fullUrl;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

}
