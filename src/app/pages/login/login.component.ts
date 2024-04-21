import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(this.email.value as string, this.password.value as string)
      .then((cred) => {
        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
