import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  fullname;
  isAdminUser: boolean = false;

  constructor(private router: Router, private authService: AuthService){
    this.fullname= sessionStorage.getItem('fullName');
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.router.events.subscribe({
      next: events => {
        if (events instanceof NavigationEnd) {
          this.checkLoginStatus();
        }
      }
    });
    
  }
  checkLoginStatus() {
    this.authService.isLoggedIn$.subscribe({
      next: status => {
        this.isLoggedIn = status;
        if(status){
          const userDetailsString: User = JSON.parse(sessionStorage.getItem('userDetails')!);
          this.isAdminUser = sessionStorage.getItem('roleName') === 'ADMIN';
          this.fullname= sessionStorage.getItem('fullName');
        }
        
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }  

  setFullName(fullname: string){
    this.fullname = fullname;
  }

}
