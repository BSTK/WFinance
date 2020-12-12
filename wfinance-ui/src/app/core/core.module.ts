import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {TopbarComponent} from './topbar/topbar.component';
import {RouterModule} from "@angular/router";
import { MenuComponent } from './sidebar/componentes/menu/menu.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
    MenuComponent,
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
