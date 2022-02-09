import { Component, OnInit } from '@angular/core';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { SideNavigationItem } from 'src/app/app-common/models';

@Component({
  selector: 'app-user-community',
  templateUrl: './user-community.component.html',
  styleUrls: ['./user-community.component.css']
})
export class UserCommunityComponent implements OnInit {
  
  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  constructor() { }

  ngOnInit(): void {
  }

}
