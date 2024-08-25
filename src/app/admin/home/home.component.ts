import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMinimizedSidebar = false;
  last_Url: any;
  selectedTab: any;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _token: TokenService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.selectedTab = this.last_Url = this.router.url.split('/')[3];
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMinimizedSidebar = result.matches;
      });
  }

  toggleSidebar() {
    this.isMinimizedSidebar = !this.isMinimizedSidebar;
  }

  goToHome() {
    this.router.navigate(['']);
  }

  gotoPage(actives: string) {
    this.selectedTab = actives;
    // this.router.navigate([`admin/home/${actives}`]);
  }

  logout() {
    this._auth.logout().subscribe({
      next: (res: { logout: boolean }) => {
        this._token.removeToken();
        window.location.href = '/admin/login';
      },
    });
  }
}
