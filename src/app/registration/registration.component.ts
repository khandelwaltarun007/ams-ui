import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private router: Router, private registrationService: RegistrationService){}
  userData: User = new User();

  onSubmit() {
    // Here you can handle form submission
    console.log('Registration Form Submitted');
    console.log('First Name:', this.userData.firstName);
    console.log('Last Name:', this.userData.lastName);
    console.log('Username:', this.userData.username);
    console.log('Password:', this.userData.password);
    console.log('Email:', this.userData.email);
    console.log('Contact:', this.userData.contact);
    this.registrationService.register(this.userData).subscribe({
        next: response => {
          console.log('registration successful', response)
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Registration failed: ', error);
          //this.loginError = 'Authentication failed.';
        }
    });
  }
}
