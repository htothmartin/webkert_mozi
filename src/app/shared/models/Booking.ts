import { Time } from '@angular/common';
import { Seat } from './Seat';

export interface Booking {
  id: string;
  user_id: string;
  movie_id: string;
  date: Date;
  seats: Seat[];
}
