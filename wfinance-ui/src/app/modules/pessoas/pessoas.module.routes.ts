import {Routes} from '@angular/router';
import {PessoasComponent} from "./pages/pessoas/pessoas.component";
import {PessoasCadastroComponent} from "./pages/pessoas-cadastro/pessoas-cadastro.component";

export const PESSOAS_ROUTES: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'cadastro', component: PessoasCadastroComponent },
  { path: 'cadastro/:pessoaId', component: PessoasCadastroComponent },
];
