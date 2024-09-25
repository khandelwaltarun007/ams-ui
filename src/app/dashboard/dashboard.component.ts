import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Login } from '../model/Login';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
  userDetails: any = sessionStorage.getItem('userDetails');
  username: any = sessionStorage.getItem('username');
  fullname: any = sessionStorage.getItem('fullName');

  ngOnInit(): void {
    // Access route parameters
    if(sessionStorage.getItem('userDetails')===null){
      this.userDetails = this.userService.getUserDetails().subscribe({
        next: userDetails => {
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
          sessionStorage.setItem('username',userDetails.username);
          this.fullname = userDetails.firstName + " " + userDetails.lastName;
          sessionStorage.setItem('fullName', this.fullname);
        },
        error: error => {
          console.error('Error fetching user details', error);
        }
    });
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]); // or ['/', path]
  }
}
