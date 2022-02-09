import { Employee, PatientInfo } from "src/app/app-common/models";

export class Appointment {
    date?: string;
    time?: string;
    patientId?: any;
    description?: string;
    employee?:Employee;
    physicianId?:string;
    createdByEmailId?:string;
    status?:number;
    constructor(date:string,time:string,patientId:PatientInfo,description:string,employee:Employee,createdByEmailId:string,status:number){
        this.date=date;
        this.patientId=patientId;
        this.physicianId=employee.employeeId;
        this.description=description;
        this.employee=employee;
        this.time=time;
        this.createdByEmailId=createdByEmailId;
        this.status=status;
    }
}