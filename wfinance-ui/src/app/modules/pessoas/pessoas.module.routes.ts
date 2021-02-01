import {Routes} from '@angular/router';
import {PessoasComponent} from "./pages/pessoas/pessoas.component";
import {AutenticadorGuard} from "../seguranca/services/autenticador.guard";
import {PessoasCadastroComponent} from "./pages/pessoas-cadastro/pessoas-cadastro.component";

export const PESSOAS_ROUTES: Routes = [
  {
    path: '',
    component: PessoasComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_PESQUISAR_PESSOA']
    }
  },
  {
    path: 'cadastro',
    component: PessoasCadastroComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  },
  {
    path: 'cadastro/:pessoaId',
    component: PessoasCadastroComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  },
];
