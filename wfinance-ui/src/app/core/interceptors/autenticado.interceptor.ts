import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AutenticadorService} from "../../modules/seguranca/domain/autenticador.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutenticadoInterceptor implements HttpInterceptor {

  constructor(private readonly autenticadorService: AutenticadorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('[AutenticadoInterceptor] interceptou request');

    const usuarioLocagdo = this.autenticadorService.usuarioEstaAutenticado();
    this.autenticadorService.eventUsuarioLogado.emit(usuarioLocagdo);
    return next.handle(request);
  }

}
