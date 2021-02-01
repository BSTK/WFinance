import {Routes} from '@angular/router';
import {AutenticadorGuard} from "../seguranca/services/autenticador.guard";
import {CategoriasComponent} from "./pages/categorias/categorias.component";
import {CategoriasCadastroComponent} from "./pages/categorias-cadastro/categorias-cadastro.component";

export const CATEGORIAS_ROUTES: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_PESQUISAR_CATEGORIA']
    }
  },
  {
    path: 'cadastro',
    component: CategoriasCadastroComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_PESQUISAR_CATEGORIA']
    }
  },
  {
    path: 'cadastro/:categoriaId',
    component: CategoriasCadastroComponent,
    canActivate: [ AutenticadorGuard ],
    data: {
      roles: ['ROLE_CADASTRAR_CATEGORIA']
    }
  },
];
