import {Routes} from '@angular/router';
import {AutenticadorGuard} from '../seguranca/services/autenticador.guard';
import {LancamentosComponent} from './pages/lancamentos/lancamentos.component';
import {LancamentosCadastroComponent} from './pages/lancamentos-cadastro/lancamentos-cadastro.component';

export const LANCAMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: LancamentosComponent,
    canActivate: [AutenticadorGuard],
    data: {
      roles: [
        'ROLE_PESQUISAR_LANCAMENTO'
      ]
    }
  },
  {
    path: 'cadastro',
    component: LancamentosCadastroComponent,
    canActivate: [AutenticadorGuard],
    data: {
      roles: [
        'ROLE_CADASTRAR_LANCAMENTO'
      ]
    }
  },
  {
    path: 'cadastro/:lacamentoId',
    component: LancamentosCadastroComponent,
    canActivate: [AutenticadorGuard],
    data: {
      roles: [
        'ROLE_CADASTRAR_LANCAMENTO'
      ]
    }
  }
];
