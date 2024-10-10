export interface Attendance {
    id: number;
    userId: number;
    date: string;
    fullname: string;
    type: string;
    status: string;
    comment: string | "";
    isSelected?: boolean
}