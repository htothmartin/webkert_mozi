import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    birtdayDate: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required)
    })
  });

  constructor(private authService: AuthService, private userService: UserService) {}

  onSubmit(){
    console.log(this.registerForm.get('birtdayDate')?.value)
    console.log(this.registerForm.valid);
    
    if(this.registerForm.valid && this.registerForm.get('password')?.value as string == this.registerForm.get('rePassword')?.value as string) {
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.get('email')?.value as string, this.registerForm.get('password')?.value as string).then(cred =>{
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          email: this.registerForm.get('email')?.value as string,
          birtday: this.registerForm.get('birtdayDate')?.value as any,
          name:{
            lastname: this.registerForm.get('name.lastname')?.value as string,
            firstname: this.registerForm.get('name.firstname')?.value as string,
          }
        }
        
        this.userService.create(user).then(
          _ => {
            console.log('User added');
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
        
      })
    }

  }
  
}
