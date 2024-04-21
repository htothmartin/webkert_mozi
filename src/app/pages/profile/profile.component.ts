import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { passwordMatchValidator } from '../../shared/validators/validator';
import { BookingService } from '../../shared/services/booking.service';
import { Booking } from '../../shared/models/Booking';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnChanges {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private bookingService: BookingService
  ) {}

  loggedInUser?: firebase.default.User | null;
  user?: User | null;
  isLoading = true;
  bookings: Booking[] = [];
  isBookingsLoaded = false;
  displayedColumns: string[] = ['film', 'date'];

  profileForm = this.fb.group({
    firstname: [this.user?.name.firstname],
    lastname: [this.user?.name.lastname],
    email: [this.user?.email],
    password: ['', Validators.minLength(6)],
    confirmPassword: ['', Validators.minLength(6)],
  });

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;

        if (this.loggedInUser) {
          this.userService.getById(this.loggedInUser.uid).subscribe(
            (user) => {
              this.user = user;
              this.isLoading = false;
              this.initForm();

              this.bookingService
                .findBookingsByUser(this.loggedInUser?.uid as string)
                .subscribe((data: Array<Booking>) => {
                  this.bookings = data;
                  this.isBookingsLoaded = true;
                });
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initForm() {
    this.profileForm = this.fb.group(
      {
        firstname: [this.user?.name.firstname],
        lastname: [this.user?.name.lastname],
        email: [this.user?.email],
        password: ['', Validators.minLength(6)],
        confirmPassword: ['', Validators.minLength(6)],
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    if (this.profileForm.valid) {
      console.log('click');
      this.toggleEditMode();

      if (this.loggedInUser && this.user) {
        const userData: User = {
          id: this.user?.id,
          email: this.profileForm.value.email as string,
          birtday: this.user?.birtday,
          name: {
            firstname: this.profileForm.value.firstname as string,
            lastname: this.profileForm.value.lastname as string,
          },
        };
        console.log(userData);
        this.userService.updateUser(userData.id, userData);
        if (
          this.profileForm.value.password &&
          this.profileForm.value.confirmPassword
        ) {
          this.authService.updatePassword(this.profileForm.value.password);
        }
      }
    }
  }
}
