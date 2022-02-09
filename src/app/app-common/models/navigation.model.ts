export interface HeaderItem {
    icon?: string;
    text: string;
    link?: string;
    submenu?: SideNavigationItem[];
}

export interface SideNavigationItems {
    [index: string]: SideNavigationItem;
}

export interface SideNavigationItem {
    icon?: string;
    label: string;
    routerLink?: string;
    items?: SideNavigationItem[];
    new?: boolean;
    updated?: boolean;
}

export interface SideNavigationSection {
    text?: string;
    items: string[];
}

export interface Patient {
    id: string;
    name: string;
    dateOfRegistration: string;
    status: string;
    link1?: string;
    link2?: string;
    edit: string;
}


export class PatientInfo {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    dateOfBirth: string;
    country:number;
    contactNumber:number;
    constructor(id:number,firstName:string,lastName: string,emailId: string,dateOfBirth: string,country:number,contactNumber:number){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.emailId=emailId;
        this.dateOfBirth=dateOfBirth;
        this.country=country;
        this.contactNumber=contactNumber;
    }
}


export interface HospitalUser {
    id: string
    name: string;
    dateOfJoining: string;
    status: string;
    link1?: string;
    link2?: string;
    edit:string;
}

export interface PatientLockedAccounts{
    id: string
    name: string;
    dateOfRegistration: string | Date;
    dateOfAccountLocked: string | Date;
    status: string;
}

export interface StaffLockedAccounts{
    id: string
    name: string;
    dateOfJoining: string | Date;
    dateOfAccountLocked: string | Date;
    status: string;
}


export class UserPatientModify {
    date: string;
    time: string;
    appointmentId: string;
    patientData: PatientInfo;
    description: string;
    employee:Employee;
    status:string;
    constructor(date:string,time:string,appointmentId:string,patientData:PatientInfo,description:string,employee:Employee,status:string){
        this.date=date;
        this.appointmentId=appointmentId;
        this.patientData=patientData;
        this.description=description;
        this.employee=employee;
        this.status=status;
        this.time=time;
    }
}

export class Appointment {
    date: string;
    time: string;
    patientData: PatientInfo;
    description: string;
    employee:Employee;
    createdByEmailId:string;
    status:number;
    constructor(date:string,time:string,patientData:PatientInfo,description:string,employee:Employee,createdByEmailId:string,status:number){
        this.date=date;
        this.patientData=patientData;
        this.description=description;
        this.employee=employee;
        this.time=time;
        this.createdByEmailId=createdByEmailId;
        this.status=status;
    }
}

export class UpdateAppointment {
    date: string;
    time: string;
    appointmentId: string;
    patientData: PatientInfo;
    description: string;
    employee:Employee;
    createdByEmailId:string;
    status:number;
    constructor(date:string,time:string,appointmentId:string,patientData:PatientInfo,description:string,employee:Employee,createdByEmailId:string,status:number){
        this.date=date;
        this.appointmentId=appointmentId;
        this.patientData=patientData;
        this.description=description;
        this.employee=employee;
        this.createdByEmailId=createdByEmailId;
        this.status=status;
        this.time=time;
    }
}

export class Employee{
    title:string;
    firstName:string;
    lastName:string;
    public emailId:string;
    dateOfBirth:string;
    role:string;
    employeeId:string;
    constructor(title:string,firstName:string,lastName:string,emailId:string,dateOfBirth:string,role:string,employeeId:string){
        this.firstName=firstName;
        this.title=title;
        this.lastName=lastName;
        this.emailId=emailId;
        this.dateOfBirth=dateOfBirth;
        this.role=role;
        this.employeeId=employeeId;
    }
}

export class NotesList {
    notesId:number
    senderId: Employee
    message: string;
    dateTime: string;
    priority:boolean;
    receiverId: Employee;
    parentNotesId:number
    constructor(senderId:Employee,message:string,dateTime:string,notesId:number,priority:boolean,receiverId: Employee,parentNotesId:number){
        this.senderId=senderId;
        this.parentNotesId=parentNotesId;
        this.message=message;
        this.dateTime=dateTime;
        this.notesId=notesId;
        this.priority=priority;
        this.receiverId=receiverId;
    }
}

export class SendNote {
    receiver: Employee;
    sender:string;
    message: string;
    priority:boolean;
    status:string;
    parentNotesId:number;
    constructor(receiver:Employee,sender:string,message:string,priority:boolean,status:string,parentNotesId:number){
        this.receiver=receiver;
        this.sender=sender;
        this.message=message;
        this.status=status;
        this.priority=priority;
        this.parentNotesId=parentNotesId;
    }
}

export class CalendarEventCustom{
    //id: string;
    title: string;
    start: string;
    constructor(title:string,start:string){
        this.title=title;
        //this.id=id;
        this.start=start;
    }
}

export class Diagnosis{
    dCode:string;
    dDescription:string;
    dDepricated:boolean;
    constructor(dCode:string,dDescription:string,dDepricated:boolean){
        this.dCode=dCode;
        this.dDepricated=dDepricated;
        this.dDescription=dDescription;
    }
}

export class Procedure{
    pCode:string;
    pDescription:string;
    pDepricated:boolean;
    constructor(pCode:string,pDescription:string,pDepricated:boolean){
        this.pCode=pCode;
        this.pDepricated=pDepricated;
        this.pDescription=pDescription;
    }
}

export class Medication{
    mId:string;
    name:string;
    genericName:string;
    brandName:string;
    form:string;
    strength:string;
    constructor(mId:string,name:string,genericName:string,brandName:string,form:string,strength:string){
        this.mId=mId;
        this.name=name;
        this.brandName=brandName;
        this.strength=strength;
        this.genericName=genericName;
        this.form=form;
    }
}

export class DiagnosisDTO{
    diagnosis:Diagnosis;
    isDepricated:boolean;
    constructor(diagnosis:Diagnosis,isDepricated:boolean){
        this.diagnosis=diagnosis;
        this.isDepricated=isDepricated;
    }
}

export class ProcedureDTO{
    procedure:Procedure;
    isDepricated:boolean;
    constructor(procedure:Procedure,isDepricated:boolean){
        this.procedure=procedure;
        this.isDepricated=isDepricated;
    }
}

export interface Consultation{
    diagnosisList:DiagnosisDTO[];
    medicationList:Medication[];
    procedureList:ProcedureDTO[];
}

export interface ConsultationList{
    appointment:Appointment;
    diagnosis:DiagnosisDTO;
    procedure:ProcedureDTO;
    medication:Medication;
}

export interface EditHistory{
    modifiedAt:string;
    modifiedBy:string;
    reason:string;
}