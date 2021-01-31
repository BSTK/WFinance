import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AutenticadorService} from "./autenticador.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly autenticadorService: AutenticadorService) {
    this.autenticadorService.verificaUsuarioLogado();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (next.data.roles && !this.autenticadorService.temPermissoes(next.data.roles)) {
      const navegarProximaPagina = !this.autenticadorService.accessTokenExpirado()
        ? '/pagina-nao-autorizado'
        : '/login';

      this.router.navigate([navegarProximaPagina]);
      return false;
    }

    if (this.autenticadorService.accessTokenExpirado()) {
      this.autenticadorService
        .novoAccessToken()
        .subscribe((_) => {
          if (this.autenticadorService.accessTokenExpirado()) {
            this.autenticadorService.usuarioLogado.next(false);
            this.router.navigate(['/login']);

            console.log('AutenticadorGuard == ');
            console.log('STATE == ', state);
            return false;
          }
        });
    }

    return true;
  }

}
