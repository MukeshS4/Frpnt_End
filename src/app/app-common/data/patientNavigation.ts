import { SideNavigationItem, SideNavigationItems, HeaderItem, SideNavigationSection } from "../models";
 
export const patientSideNavigationItem: SideNavigationItem[] = [
    {
        icon: 'pi pi-fw pi-th-large',
        label: 'Dashboard',
        routerLink: '/patient',
    },
    {
        icon:'pi pi-fw pi-info-circle',
        label: 'Patient Details',
        routerLink: '/patient/patientDetails',
    },
    {
        icon:'pi pi-fw pi-info-circle',
        label: 'Patient Visit Details',
        routerLink: '/patient/patientVisit',
    },
    {
        icon:'pi pi-fw pi-info-circle',
        label: 'Schedule Meeting',
        routerLink: '/patient/schedule',
    },
        {
        icon: 'pi pi-fw pi-calendar',
        label: 'Appointment Schedule',
        items: [
            {
                icon: 'pi pi-fw pi-trash',
                label: 'All Appointment',
                routerLink: '/user/modifyappointment',
            },
        ]
    },
    {
        icon:'pi pi-fw pi-info-circle',
        label: 'Rate & Review',
        routerLink: '/patient/rate&review',
    },
    {
        icon:'pi pi-fw pi-facebook ',
        label:'Community',
        routerLink:'/patient/patient-community'
    }

    // },
    // {
    //     icon:'pi pi-fw pi-info-circle',
    //     label: 'Patient Details',
    //     routerLink: '/patient/pmsDetails/patientDetails',
    // }
]