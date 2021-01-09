import {Routes} from '@angular/router';
import {CategoriasComponent} from "./pages/categorias/categorias.component";
import {CategoriasCadastroComponent} from "./pages/categorias-cadastro/categorias-cadastro.component";
import {AutenticadorGuard} from "../seguranca/domain/autenticador.guard";

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
