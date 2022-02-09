import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    TabViewModule,
    BadgeModule,
    MenuModule,
    PanelMenuModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ]
})
export class AppCommonModule { }
