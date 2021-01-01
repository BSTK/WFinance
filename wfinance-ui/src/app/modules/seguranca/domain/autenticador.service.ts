import {Router} from "@angular/router";
import {Usuario} from "./usuario.model";
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  readonly eventUsuarioLogado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly router: Router) { }

  /// TODO: IMPLEMENTAR REGRA PARA VALIDAR LOGIN
  login(usuario: Usuario) {
    const usuarioLoginValido = (
      usuario.email === 'login@email.com' &&
      usuario.senha === 'senha');

    if (usuarioLoginValido) {
      this.router.navigate((['/lancamentos']));
      this.eventUsuarioLogado.emit(true);
    } else {
      this.router.navigate((['/login']));
      this.eventUsuarioLogado.emit(false);
    }
  }

}
