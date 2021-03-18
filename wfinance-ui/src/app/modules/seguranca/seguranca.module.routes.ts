import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

export const SEGUANCA_ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', component: LoginComponent}
];
