import {Routes} from '@angular/router';
import {LancamentosComponent} from "./pages/lancamentos/lancamentos.component";
import {LancamentosCadastroComponent} from "./pages/lancamentos-cadastro/lancamentos-cadastro.component";

export const LANCAMENTOS_ROUTES: Routes = [
  { path: '', component: LancamentosComponent },
  { path: 'cadastro', component: LancamentosCadastroComponent },
];
