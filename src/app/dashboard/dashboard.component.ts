import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Login } from '../login/Login';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: AuthService) { }

  username: any;

  ngOnInit(): void {
    // Access route parameters
    console.log('loginData:', this.authService.getUsername());
    console.log('login session: ', this.authService.getSessionData('userSession'));
    this.username = this.authService.getUsername();
  }
}
