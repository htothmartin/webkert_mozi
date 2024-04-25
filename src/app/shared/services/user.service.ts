import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  collectionName = 'Users';

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  create(user: User) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(user.id)
      .set(user);
  }

  getById(id: string) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  updateUser(id: string, userData: User) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(id)
      .update(userData);
  }
}
