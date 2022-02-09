import { PatientLockedAccounts, StaffLockedAccounts } from "../models";

export const patientLockedData: PatientLockedAccounts[] = [
    {
        id: 'P-01',
        name: 'TestCase-1',
        dateOfRegistration: '08/09/2021',
        dateOfAccountLocked: '09/09/2021',
        status:'Blocked',
    },
    {
        id: 'P-02',
        name: 'TestCase-1',
        dateOfRegistration: '18/08/2021',
        dateOfAccountLocked: '08/09/2021',
        status:'Blocked',
    },
    {
        id: 'P-03',
        name: 'TestCase-3',
        dateOfRegistration: '18/06/2021',
        dateOfAccountLocked: '18/08/2021',
        status:'Blocked',
    },{
        id: 'P-04',
        name: 'TestCase-4',
        dateOfRegistration: '18/07/2020',
        dateOfAccountLocked: '12/08/2021',
        status:'Blocked',
    },{
        id: 'P-05',
        name: 'TestCase-5',
        dateOfRegistration: '07/08/2020',
        dateOfAccountLocked: '08/06/2021',
        status:'Blocked',
    },
    ];

    export const staffLockedData: StaffLockedAccounts[] = [
        {
            id: 'HS-01',
            name: 'TestCase-1',
            dateOfJoining: '08/09/2021',
            dateOfAccountLocked: '09/09/2021',
            status:'Blocked',
        },
        {
            id: 'HS-02',
            name: 'TestCase-2',
            dateOfJoining: '18/08/2021',
            dateOfAccountLocked: '08/09/2021',
            status:'Blocked',
        },
        {
            id: 'HS-03',
            name: 'TestCase-3',
            dateOfJoining: '18/06/2021',
            dateOfAccountLocked: '18/08/2021',
            status:'Blocked',
        },{
            id: 'HS-04',
            name: 'TestCase-4',
            dateOfJoining: '18/07/2020',
            dateOfAccountLocked: '12/08/2021',
            status:'Blocked',
        },{
            id: 'HS-05',
            name: 'TestCase-5',
            dateOfJoining: '07/08/2020',
            dateOfAccountLocked: '08/06/2021',
            status:'Blocked',
        },
        ];
    