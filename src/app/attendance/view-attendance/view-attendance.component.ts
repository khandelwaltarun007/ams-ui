import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../model/Attendance';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-attendance.component.html',
  styleUrl: './view-attendance.component.css'
})
export class ViewAttendanceComponent implements OnInit{


  attendances: Attendance[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  searchName: any;
  
  constructor(private attendanceService: AttendanceService){}
  
  ngOnInit(): void {
    this.fetchAttendance();
  }

  fetchAttendance(): void {
    this.attendanceService.getAttendances(this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.attendances = data.content;
        this.totalPages = data.totalPages;
        console.log(data);
      },
      error: error => {
        console.error('Error fetching attendance records:', error);
      }
    });
  }

  onSearch(): void {
    this.fetchAttendance();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchAttendance();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchAttendance();
    }
  }

  getSequenceNumber(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }

  searchAttendances() {
    throw new Error('Method not implemented.');
    }

}
