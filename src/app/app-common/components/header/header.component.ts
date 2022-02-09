import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { sideNavigationItem } from '../../data/navigation.data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService : AuthService
  ) { }
  userName: any;
  display!: boolean;
  useritems!: MenuItem[];
  headerItems!: MenuItem[];
  notificationitems!: MenuItem[];
  @Input() navigationitems: any;
  ngOnInit() {
    //make a menuitem for notification as below
    this.userName = localStorage.getItem('username');
    this.useritems = [
      {
        label: this.userName,
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/user/info'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucustom'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (event: Event)=>{ this.authService.logout()},
        // routerLink: ['/logout'],
        // routerLinkActiveOptions: {
        //   exact: true
        // },
        styleClass: 'menucustom'
      }
    ]

    this.headerItems = [
      {
        label: 'About Us',
        icon: 'pi pi-fw pi-home',
        // items: [
        //   {
        //     label: 'New',
        //     icon: 'pi pi-fw pi-plus',
        //     items: [
        //       {
        //         label: 'Bookmark',
        //         icon: 'pi pi-fw pi-bookmark'
        //       },
        //       {
        //         label: 'Video',
        //         icon: 'pi pi-fw pi-video'
        //       },

        //     ]
        //   },
        //   {
        //     label: 'Delete',
        //     icon: 'pi pi-fw pi-trash'
        //   },
        //   {
        //     separator: true
        //   },
        //   {
        //     label: 'Export',
        //     icon: 'pi pi-fw pi-external-link'
        //   }
        // ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Admin',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Patient',
            icon: 'pi pi-fw pi-user-minus',

          },
          {
            label: 'Staff',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Physician',
                icon: 'pi pi-fw pi-plus-circle'
              },
              {
                icon: 'pi pi-fw pi-circle-on',
                label: 'Nurse'
              }
            ]
          }
        ]
      }
    ];
  }
  // onToggle(){
  //   this.display=true;
  //   const dashboard = document.querySelector('#admin-homepage');
  //   const dashboardclose = document.querySelector('.p-sidebar-close p-sidebar-icon p-link');
  //   console.log(dashboardclose);
  //   console.log(dashboard);
  //   dashboard?.setAttribute("style","width:calc(100%-20rem)");
  // }


}
