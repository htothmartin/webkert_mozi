import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnChanges {


  constructor ( private authService: AuthService, private fb: FormBuilder, private userService: UserService)  {}

  loggedInUser?: firebase.default.User | null;
  user?: User | null;
  isLoading = true;

  profileForm = this.fb.group({
    name: '',
    email: ''
  })

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      console.log(user); 
  
      if (this.loggedInUser) {
        this.userService.getById(this.loggedInUser.uid).subscribe((user) => {
          this.user = user;
          console.log(user);
          this.isLoading = false; 
        }, error => {
          console.log(error);
        })
      }
    }, error => {
      console.log(error);
    })
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    
  }




  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.toggleEditMode();
  }


}
