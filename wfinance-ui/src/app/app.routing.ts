import {APP_BASE_HREF} from '@angular/common';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './core/pages/page-not-found/page-not-found.component';
import {PageNaoAutorizadoComponent} from './core/pages/page-nao-autorizado/page-nao-autorizado.component';

const ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/seguranca/seguranca.module')
      .then(module => module.SegurancaModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./modules/categorias/categorias.module')
      .then(module => module.CategoriasModule)
  },
  {
    path: 'lancamentos',
    loadChildren: () => import('./modules/lancamentos/lancamentos.module')
      .then(module => module.LancamentosModule)
  },
  {
    path: 'pessoas',
    loadChildren: () => import('./modules/pessoas/pessoas.module')
      .then(module => module.PessoasModule)
  },
  {
    path: 'pagina-nao-autorizado',
    component: PageNaoAutorizadoComponent
  },
  {
    path: 'pagina-nao-encontrada', component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada'
  }
];

export const APP_ROUTING_PROVIDER: any[] = [
  {provide: APP_BASE_HREF, useValue: '/wfinance'}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {useHash: true});
