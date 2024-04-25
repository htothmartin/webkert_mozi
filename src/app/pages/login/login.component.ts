import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}


  login() {
    this.authService
      .login(this.email.value as string, this.password.value as string)
      .then((cred) => {
        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.error(error);
        this.snackBar.open('Hibás e-mail cím vagy jelszó!', 'Rendben', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      });
  }  
}
