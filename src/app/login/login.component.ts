import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './Login';
import { state } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: String = '';

  constructor(private authService: AuthService, private router: Router){}
  loginData: Login = new Login();

  login(): void{
    this.authService.authenticate(this.loginData).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.setSessionData("userSession", response);
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        console.error('Login failed: ', error.error.details);
        this.loginError = error.error.details;
      }
  });
  }

  setSessionData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  resetValue() {
    this.loginError = '';
    this.loginData.username='';
    this.loginData.password='';
  }

  registrationRedirect(){
    this.router.navigate(['/registration']);
  }
}