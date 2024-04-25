import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Booking } from '../models/Booking';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Seat } from '../models/Seat';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  collectionName = 'Bookings';

  constructor(private afs: AngularFirestore) {}

  findBookingsForMovie(movie_id: string, date: Date) {
    const dateInUTC = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() - 2,
        date.getMinutes()
      )
    );
    const timestamp = firebase.firestore.Timestamp.fromDate(dateInUTC);
    console.log(timestamp);
    return this.afs
      .collection<Booking>(this.collectionName, (ref) => {
        return ref
          .where('movie_id', '==', movie_id)
          .where('date', '==', timestamp);
      })
      .valueChanges();
  }

  bookSeats(booking: Booking) {
    return this.afs
      .collection<Booking>(this.collectionName)
      .add(Object.assign({}, booking)).then(docRef => {
        return docRef.update('id', docRef.id);
      })
  }

  findBookingsByUser(user_id: string) {
    return this.afs
      .collection<Booking>(this.collectionName, (ref) => {
        return ref.where('user_id', '==', user_id);
      })
      .valueChanges();
  }

  deleteBooking(booking: Booking){
    return this.afs.collection<Booking>(this.collectionName).doc(booking.id).delete();
  }
}
