import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { error } from 'console';
import e from 'express';
import { MatSidenav } from '@angular/material/sidenav';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'webkert_mozi';
  loggedInUser?: firebase.default.User | null;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(user?.uid));
        }
      },
      (error) => {
        console.error(error);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(null));
        }
      }
    );
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Logout');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleSideNav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
