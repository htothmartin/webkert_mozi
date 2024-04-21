import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { SeatComponent } from './seat-booking/seat/seat.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PageComponent,
    CurrencyFormatPipe,
    SeatBookingComponent,
    SeatComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class PageModule {}
