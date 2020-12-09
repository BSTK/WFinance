import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";

const ROUTES: Routes = [
  {
    path: 'lancamentos',
    loadChildren: () => import('./modules/lancamentos/lancamentos.module')
      .then(module => module.LancamentosModule)
  }
];

export const APP_ROUTING_PROVIDER: any[] = [
  { provide: APP_BASE_HREF, useValue: '/wfinance'}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {useHash: true});
