import {Routes} from '@angular/router';
import {LancamentosComponent} from "./pages/lancamentos/lancamentos.component";
import {LancamentosCadastroComponent} from "./pages/lancamentos-cadastro/lancamentos-cadastro.component";
import {AutenticadorGuard} from "../seguranca/domain/autenticador.guard";

export const LANCAMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: LancamentosComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_PESQUISAR_LANCAMENTO']
    }
  },
  {
    path: 'cadastro',
    component: LancamentosCadastroComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO']
    }
  },
  {
    path: 'cadastro/:lacamentoId',
    component: LancamentosCadastroComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO']
    }
  },
];
