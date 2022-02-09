import { SideNavigationItem, SideNavigationItems, HeaderItem, SideNavigationSection } from "../models";

export const sideNavigationItem: SideNavigationItem[] = [
    {
        icon: 'pi pi-fw pi-th-large',
        label: 'Dashboard',
        routerLink: '/admin/',
    },
    {
        icon: 'pi pi-fw pi-users',
        label: 'User Action',
        items: [
            {
                icon: 'pi pi-fw pi-user-plus',
                label: 'Add User',
                routerLink: '/admin/add-user',
            },
            {
                icon: 'pi pi-fw pi-user-edit',
                label: 'Edit-User',
                routerLink: '/admin/edit-user',
            },
            {
                icon: 'pi pi-fw pi-user-minus',
                label: 'Delete-User',
                routerLink: '/admin/delete-user',
            }
        ]
    },
    {
        icon:'pi pi-fw pi-lock-open',
        label:'Unlock Account',
        routerLink: '/admin/unlock-account'
    },{
        icon:'pi pi-fw pi-facebook ',
        label:'Community',
        routerLink:'/community/admin-community'
    },{
        icon:'pi pi-cog',
        label:'Trace/Metrics',
        routerLink:'/admin/actuator-metrics'
    }
]