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
  styleUrls: ['./view-attendance.component.css'] // Fix: use 'styleUrls' instead of 'styleUrl'
})
export class ViewAttendanceComponent implements OnInit {

  attendances: Attendance[] = [];
  filteredAttendances: Attendance[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalRecords = 0;
  pageSizes: number[] = [5, 10, 20, 50];

  // Search fields
  searchDate: string = '';
  searchUserId: string = '';
  searchFullName: string = '';
  searchType: string = '';
  searchStatus: string = '';
  searchComment: string = '';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.fetchAttendance();
  }

  fetchAttendance(): void {
    this.attendanceService.getAttendances(this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.attendances = data.content;
        this.totalPages = data.totalPages;
        this.totalRecords = data.totalElements;
        this.filteredAttendances = this.attendances; // Initialize filtered records
        console.log(data);
      },
      error: error => {
        console.error('Error fetching attendance records:', error);
      }
    });
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.fetchAttendance();
  }

  searchAttendances(): void {
    this.filteredAttendances = this.attendances.filter(record => {
      return (!this.searchDate || record.date.includes(this.searchDate)) &&
             (!this.searchUserId || record.userId.toString().includes(this.searchUserId)) &&
             (!this.searchFullName || record.fullname.toLowerCase().includes(this.searchFullName.toLowerCase())) &&
             (!this.searchType || record.type.toLowerCase().includes(this.searchType.toLowerCase())) &&
             (!this.searchStatus || record.status.toLowerCase().includes(this.searchStatus.toLowerCase())) &&
             (!this.searchComment || record.comment.toLowerCase().includes(this.searchComment.toLowerCase()));
    });
    this.totalRecords = this.filteredAttendances.length; // Update total records count
    this.currentPage = 0; // Reset to the first page
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
}