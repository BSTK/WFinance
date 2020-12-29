import {APP_BASE_HREF} from "@angular/common";
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
  /// TODO: REFARORAR PARA REDIRECIONAR PARA O DASHBOARD ASSIM QUE IMPLEMENTADO
  {
    path: '', redirectTo: 'lancamentos', pathMatch: 'full'
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
  }
];

export const APP_ROUTING_PROVIDER: any[] = [
  { provide: APP_BASE_HREF, useValue: '/wfinance'}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {useHash: true});
