import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FooterComponent} from './footer/footer.component';
import {TopbarComponent} from './topbar/topbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MenuComponent} from './sidebar/componentes/menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    TopbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class CoreModule { }
