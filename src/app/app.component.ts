import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { error } from 'console';
import e from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'webkert_mozi';
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    }, error => {
      console.log(error);
    })
  }

  logout(){
    this.authService.logout().then(() => {
      console.log("Logout");
    }).catch(error => {
      console.log(error);
    })
  }
}
