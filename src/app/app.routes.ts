import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { AddAttendenceComponent } from './attendance/add-attendence/add-attendence.component';
import { ViewAttendanceComponent } from './attendance/view-attendance/view-attendance.component';
import { UpdateAttendanceComponent } from './attendance/update-attendance/update-attendance.component';
import { authGuard } from './auth.guard';
import { ApproveAttendanceComponent } from './attendance/approve-attendance/approve-attendance.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate:[authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to the login page by default
    { path: 'add-attendance', component: AddAttendenceComponent },
    { path: 'get-attendance', component: ViewAttendanceComponent },
    { path: 'update-attendance', component: UpdateAttendanceComponent },
    { path: 'register', component: RegistrationComponent},
    { path: 'approve-attendance', component: ApproveAttendanceComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }