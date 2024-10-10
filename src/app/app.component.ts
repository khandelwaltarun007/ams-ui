import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApproveAttendanceComponent } from './attendance/approve-attendance/approve-attendance.component';
import { ChartsModule } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, FormsModule, DashboardComponent, HeaderComponent, FooterComponent, ApproveAttendanceComponent, ChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add the schema here
})
export class AppComponent {
  title = 'ams';
}
