import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AutenticadorService} from "./autenticador.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly autenticadorService: AutenticadorService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    /// TODO: USAR DEPOIS DO LOGOUT
    if (this.autenticadorService.accessTokenExpirado()) {
      this.autenticadorService.novoAccessToken()
          .subscribe((_) => {
            this.router.navigate(['/login']);
            return false;
          });
    }

    /// TODO: IMPLEMENTAR O ACESSO NEGADO

    return true;
  }

}
