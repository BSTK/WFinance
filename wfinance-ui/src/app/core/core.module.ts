import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './components/footer/footer.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MenuComponent} from './components/sidebar/components/menu/menu.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {PageNaoAutorizadoComponent} from './pages/page-nao-autorizado/page-nao-autorizado.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    TopbarComponent,
    SidebarComponent,
    PageNotFoundComponent,
    PageNaoAutorizadoComponent
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
export class CoreModule {
}
