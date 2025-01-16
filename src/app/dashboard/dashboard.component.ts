import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AttendanceService } from '../services/attendance.service';
import { Attendance } from '../model/Attendance';
import { CommonService } from '../services/common.service';
import { AttendanceCalculationResponse } from '../model/AttendanceCalculationResponse';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  attendances: Attendance[] = [];
  monthlyWFOCounts: { [key: string]: number } = {};
  barChart: Chart | undefined;
  userId: any;
  attendanceData: AttendanceCalculationResponse | null = null;
  donutChart: Chart | undefined;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private attendanceService: AttendanceService, private commonService: CommonService) { }
  userDetails: any = sessionStorage.getItem('userDetails');
  username: any = sessionStorage.getItem('username');
  fullname: any = sessionStorage.getItem('fullName');

  ngOnInit(): void {
    // Access route parameters
    if (sessionStorage.getItem('userDetails') === null) {
      this.userDetails = this.userService.getUserDetails().subscribe({
        next: userDetails => {
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
          sessionStorage.setItem('username', userDetails.username);
          this.fullname = userDetails.firstName + " " + userDetails.lastName;
          sessionStorage.setItem('fullName', this.fullname);
        },
        error: error => {
          console.error('Error fetching user details', error);
        }
      });
    }
    this.fetchAttendance();
    this.fetchAttendanceData();
  }

  navigateTo(path: string) {
    this.router.navigate([path]); // or ['/', path]
  }

  fetchAttendance(): void {
    this.userId = this.commonService.getSessionData('userDetails').id;
    this.attendanceService.getAttendancesByUserId(this.userId, 0, 10000).subscribe({
      next: data => {
        this.attendances = data.content;
        this.processAttendanceData();
        this.createChart();
      },
      error: error => {
        console.error('Error fetching attendance records:', error);
      }
    });
  }

  processAttendanceData(): void {
    this.monthlyWFOCounts = {};

    this.attendances.forEach(record => {
      const date = new Date(record.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (record.type === 'WFO') {
      if (!this.monthlyWFOCounts[monthYear]) {
        this.monthlyWFOCounts[monthYear] = 0;
      }
      this.monthlyWFOCounts[monthYear]++;
      }
    });
  }

  createChart(): void {
    const labels = Object.keys(this.monthlyWFOCounts).sort(); // Sort months
    const data = labels.map(label => this.monthlyWFOCounts[label]);

    if (this.barChart) {
      this.barChart.destroy(); // Destroy the previous chart instance
    }

    this.barChart = new Chart('wfoChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'WFO Days',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of WFO Days'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
          },
        }
      }
    });
  }

  fetchAttendanceData(): void {
    this.userId = this.commonService.getSessionData('userDetails').id;
    this.attendanceService.getAttendanceCalculation(this.userId).subscribe({
      next: (data: AttendanceCalculationResponse) => {
        this.attendanceData = data;
        this.createDonutChart();
      },
      error: (error) => {
        console.error('Error fetching attendance data:', error);
      }
    });
  }

  createDonutChart(): void {
    if (this.donutChart) {
      this.donutChart.destroy(); // Clean up previous chart instance
    }
    
    const percentage = this.attendanceData?.percentage ? this.attendanceData.percentage.toFixed(2) : '0.00';
    const data = {
      labels: ['WFO Days', 'WFH Days', 'Absence Days'],
      datasets: [{
        label: 'Attendance Breakdown',
        data: [
          this.attendanceData?.wfoDays || 0,
          this.attendanceData?.presentDays || 0,
          this.attendanceData?.absenseDays || 0
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // WFO Days color
          'rgba(255, 206, 86, 0.6)',  // WFH Days color
          'rgba(255, 99, 132, 0.6)'    // Absence Days color
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    this.donutChart = new Chart(ctx, {
      type: 'doughnut' as keyof ChartTypeRegistry,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Attendance Breakdown'
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    const percentageLabel = () => {
      if (!this.donutChart) return; // Ensure donutChart exists
      const ctx = this.donutChart.ctx;
      const centerX = this.donutChart.chartArea.left + (this.donutChart.chartArea.right - this.donutChart.chartArea.left) / 2;
      const centerY = this.donutChart.chartArea.bottom + 30; // Adjust vertical position as needed
  
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(`${percentage}%`, centerX, centerY);
      ctx.restore();
    };
  
    // Call percentageLabel after chart is drawn
    this.donutChart.update();
    percentageLabel();
    
    
  }
}
