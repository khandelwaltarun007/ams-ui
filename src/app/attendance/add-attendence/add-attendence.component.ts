import { Component, OnInit, Renderer2 } from '@angular/core';
import { AttendanceType } from '../../model/AttendanceType';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceRequest } from '../../model/AttendanceRequest';

@Component({
  selector: 'app-add-attendence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-attendence.component.html',
  styleUrl: './add-attendence.component.css'
})
export class AddAttendenceComponent implements OnInit {

  selectedKey: any;
  attendanceTypes: { key: string; value: string }[] = [];
  fullName: any;
  attendanceRequest: AttendanceRequest = {
    userId: 0, date: new Date(), type: null
  };

  constructor(private attendanceService: AttendanceService, private commonService: CommonService){
    this.populateAttendanceTypes();
  }

  populateAttendanceTypes() {
    this.attendanceTypes = Object.keys(AttendanceType).map(key => ({
      key: key,
      value: AttendanceType[key as keyof typeof AttendanceType]
    }));
  }

  onSelectChange(event: Event) {
    this.selectedKey = (event.target as HTMLSelectElement).value;
  }
  
  ngOnInit(): void {
    this.fullName = sessionStorage.getItem('fullName');
    /*this.attendanceRequest.type = AttendanceType.WFH;
    this.attendanceRequest.date = new Date();
    this.attendanceRequest.userId = 2;
    this.attendanceService.addAttendance(this.attendanceRequest).subscribe({
      next: response => {
        console.log(response);
      }
    });*/
  }

  onSubmit() {
    this.attendanceRequest.type = this.selectedKey;
    this.attendanceRequest.userId = this.commonService.getSessionData('userDetails').id;
    console.log(this.attendanceRequest);
    this.attendanceService.addAttendance(this.attendanceRequest).subscribe({
      next: response => {
        console.log(response);
      }
    });
    const modalElement = document.getElementById('successModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
  }
  closeModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.hide(); // Hide the modal
    }
  }

  isSubmitDisabled(): boolean {
    return !this.attendanceRequest.date || !this.selectedKey;
  }
}
