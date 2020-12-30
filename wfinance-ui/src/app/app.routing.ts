import {APP_BASE_HREF} from "@angular/common";
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./core/page-not-found/page-not-found.component";

const ROUTES: Routes = [
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
    path: 'pagina-nao-encontrada', component: PageNotFoundComponent
  },
  {
    /// TODO: REFARORAR PARA REDIRECIONAR PARA O DASHBOARD ASSIM QUE IMPLEMENTADO
    path: '', redirectTo: 'lancamentos', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

export const APP_ROUTING_PROVIDER: any[] = [
  { provide: APP_BASE_HREF, useValue: '/wfinance'}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {useHash: true});
