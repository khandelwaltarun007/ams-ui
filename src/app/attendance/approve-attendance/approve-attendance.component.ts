import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../model/Attendance';
import { AttendanceType } from '../../model/AttendanceType';
import { ApprovalStatus } from '../../model/ApprovalStatus';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approve-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approve-attendance.component.html',
  styleUrl: './approve-attendance.component.css'
})
export class ApproveAttendanceComponent implements OnInit {

  attendances: Attendance[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalRecords = 0;
  pageSizes: number[] = [5, 10, 20, 50];
  managerUsername: string = '';
  searchName: string = '';
  isEditingComment: { [key: number]: boolean } = {};

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.getPendingForApprovalAttendances();
  }
  getPendingForApprovalAttendances() {
    this.managerUsername = JSON.parse(sessionStorage.getItem('userDetails')!).username;
    this.attendanceService.getAttendancesByManagerUserName(this.managerUsername, ApprovalStatus.PENDING_FOR_APPROVAL.toLocaleString(), this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.attendances = data.content;
        this.totalPages = data.totalPages;
        this.totalRecords = data.totalElements;
        console.log(data);
      },
      error: error => {
        console.error('Error fetching attendance records:', error);
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getPendingForApprovalAttendances();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getPendingForApprovalAttendances();
    }
  }

  getSequenceNumber(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.getPendingForApprovalAttendances();
  }

  approve(record: Attendance) {
    this.saveComment(record);
    this.updateAttendance(record);
    console.log(`Approved: ${record.fullname}`);
    this.getPendingForApprovalAttendances();
  }

  reject(record: Attendance) {
    this.saveComment(record);
    console.log(`Rejected: ${record.fullname}`);
    this.getPendingForApprovalAttendances();
  }

  saveComment(record: Attendance) {
    this.isEditingComment[record.userId] = false;
  }

  areAllSelected(): boolean {
    return this.attendances.every(record => record.isSelected);
  }

  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.attendances.forEach(record => record.isSelected = isChecked);
  }


  approveSelected() {
    const selectedRecords = this.attendances.filter(record => record.isSelected);
    selectedRecords.forEach(record => this.approve(record));
    this.getPendingForApprovalAttendances();
  }

  rejectSelected() {
    const selectedRecords = this.attendances.filter(record => record.isSelected);
    selectedRecords.forEach(record => this.reject(record));
    this.getPendingForApprovalAttendances();
  }

  areAnySelected(): boolean {
    return this.attendances.some(record => record.isSelected);
  }

  updateAttendance(attendance: Attendance){
    attendance.status="APPROVED";
    attendance.comment="APPROVED"
    this.attendanceService.updateAttendance(attendance).subscribe({
      next: data => {
          console.log(data);
      }
    });
  }

}
