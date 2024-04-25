import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  updatePassword(newPassword: string) {
    this.auth.currentUser.then((user) => {
      if (user) {
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log('Jelszó sikeresen frissítve');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  updateEmail(newEmail: string) {
    this.auth.currentUser.then((user) => {
      if (user) {
        user
          .updateEmail(newEmail)
          .then(() => {
            console.log('Az email sikeresen frissítve');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }
}
