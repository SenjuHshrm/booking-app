import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _token: TokenService
  ) {
    this.selectedTab = this.last_Url = this.router.url.split('/')[3];
  }

  isMinimizedSidebar = false;
  last_Url: any;
  selectedTab: any;


  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isMinimizedSidebar = !this.isMinimizedSidebar;
  }

  goToHome() {
    this.router.navigate(['']);
  }


  gotoPage(actives: string) {
    this.selectedTab = actives;
    this.router.navigate([`admin/home/${actives}`]);
  }

  logout() {
    this._auth.logout().subscribe({
      next: (res: { logout: boolean }) => {
        this._token.removeToken()
        window.location.href = '/admin/login'
      }
    })
  }


}
