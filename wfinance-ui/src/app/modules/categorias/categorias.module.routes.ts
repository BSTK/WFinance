import {Routes} from '@angular/router';
import {CategoriasComponent} from "./pages/categorias/categorias.component";
import {CategoriasCadastroComponent} from "./pages/categorias-cadastro/categorias-cadastro.component";

export const CATEGORIAS_ROUTES: Routes = [
  { path: '', component: CategoriasComponent },
  { path: 'cadastro', component: CategoriasCadastroComponent },
  { path: 'cadastro:categoriaId', component: CategoriasCadastroComponent },
];
