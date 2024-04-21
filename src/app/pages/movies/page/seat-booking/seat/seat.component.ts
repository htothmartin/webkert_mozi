import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Seat } from '../../../../../shared/models/Seat';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss',
})
export class SeatComponent {
  @Input() seat!: Seat;
  @Output() select = new EventEmitter<void>();

  selectSeat() {
    if (!this.seat.reserved) {
      this.select.emit();
    }
  }
}
