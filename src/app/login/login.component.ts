import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: String = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private commonService: CommonService) { }
  loginData: Login = new Login();

  login(): void {
    this.authService.login(this.loginData).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        console.error('Login failed: ', error.error.details);
        this.loginError = error.error.details;
      }
    });
  }

  

  navigateTo(path: string) {
    this.router.navigate([path]); // or ['/', path]
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  resetValue() {
    this.loginError = '';
    this.loginData.username = '';
    this.loginData.password = '';
  }

  registrationRedirect() {
    this.router.navigate(['/registration']);
  }
}