import { SideNavigationItem, SideNavigationItems, HeaderItem, SideNavigationSection } from "../models";

export const userSideNavigationItem: SideNavigationItem[] = [
    {
        icon: 'pi pi-fw pi-th-large',
        label: 'Dashboard',
        routerLink: '/user',
    },
    {
        icon: 'pi pi-fw pi-inbox',
        label: 'Inbox',
        items: [
            {
                icon: 'pi pi-fw pi-user',
                label: 'Appointment',
                routerLink: '/user/inbox',
            },
        ]
    },
    {
        icon: 'pi pi-fw pi-calendar',
        label: 'Appointment Schedule',
        items: [
            {
                icon: 'pi pi-wallet',
                label: 'All Appointment',
                routerLink: '/user/modifyappointment',
            },
            {
                icon: 'pi pi-check-square',
                label: 'Verify Appointment',
                routerLink: '/user/verifyappointment',
            },
        ]
    },
    {
        icon: 'pi pi-fw pi-calendar',
        label: 'Patient Details',
        items: [
            {
                icon: 'pi pi-wallet',
                label: 'Patient Details',
                routerLink: '/user/patientconsult',
            },
        ]
    },
    {
        icon:'pi pi-fw pi-facebook ',
        label:'Community',
        routerLink:'/user/usercommunity'
    }
]