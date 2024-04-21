import { Component, OnInit, Input } from '@angular/core';
import { Seat } from '../../../../shared/models/Seat';
import { Booking } from '../../../../shared/models/Booking';
import { BookingService } from '../../../../shared/services/booking.service';
import { Movie } from '../../../../shared/models/Movie';
import { Time } from '@angular/common';
import { subscribe } from 'diagnostics_channel';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.scss',
})
export class SeatBookingComponent implements OnInit {
  seats: Seat[][] = [];
  bookings: Booking[] = [];
  reservedSeats: Seat[] = [];
  selectedSeats: Seat[] = [];
  @Input() movieInput?: Movie;
  @Input() dateInput?: Date;
  loggedInUser?: firebase.default.User | null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.dateInput);
    this.bookingService
      .findBookingsForMovie(
        this.movieInput?.id as string,
        this.dateInput as Date
      )
      .subscribe((data: Array<Booking>) => {
        this.bookings = data;
        this.seats = this.generateSeats(6, 8);
        console.log(this.bookings);
      });
  }

  generateSeats(rows: number, seatsPerRow: number): Seat[][] {
    const reservedSeats = new Set();
    this.bookings.forEach(function (booking) {
      booking.seats.forEach(function (seat) {
        reservedSeats.add(seat.row + '-' + seat.number);
      });
    });

    const seats = [];
    for (let row = 1; row <= rows; row++) {
      const seatRow = [];
      for (let number = 1; number <= seatsPerRow; number++) {
        const isReserved = reservedSeats.has(row + '-' + number);
        seatRow.push({ row: row, number: number, reserved: isReserved });
      }
      seats.push(seatRow);
    }
    console.log(seats);
    return seats;
  }

  reserveSeat(seat: Seat) {
    seat.reserved = !seat.reserved;
    this.selectedSeats.push(seat);
    console.log(this.selectedSeats);
  }

  reserveSeats() {
    if (this.selectedSeats.length > 0) {
      const newBooking = {
        id: '',
        user_id: this.loggedInUser?.uid as string,
        movie_id: this.movieInput?.id as string,
        date: this.dateInput as Date,
        seats: this.selectedSeats,
      };

      this.bookingService.bookSeats(newBooking);
      this.selectedSeats = [];
    }
  }
}
