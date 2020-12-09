import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {TopbarComponent} from './topbar/topbar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
