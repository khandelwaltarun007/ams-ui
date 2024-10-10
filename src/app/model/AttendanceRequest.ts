import { AttendanceType } from "./AttendanceType";

export interface AttendanceRequest {
    userId: number;
    type: AttendanceType | null;
    date: Date;
}