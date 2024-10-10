export interface User {
    id: number;
	firstName: string;
	lastName: string;
    username: string;
	email: string;
	contact: string;
	isTemporaryPassword: boolean;
	status: boolean;
	dateOfJoining: Date;
	roleName: string;
	roleId: number;
	managerId: number;
	managerUsername: string;
    assignedProjects: [];
}