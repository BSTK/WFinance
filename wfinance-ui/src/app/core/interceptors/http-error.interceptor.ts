import {Api} from '../../api';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {StatusCodes} from 'http-status-codes/build/cjs';
import {notEmpty} from '../../shared/utils/object-utils';
import {REFRESH_TOKEN_PAYLOAD} from '../../shared/utils/constants/seguranca.constants';
import {AutenticadorService} from '../../modules/seguranca/services/autenticador.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  
  private readonly LABEL_ERRO = 'Erro';
  private readonly LABEL_AVISO = 'Aviso';
  
  private readonly ERRO_DE_SISTEMA = 'Erro de sistema';
  private readonly ERRO_INVALID_GRANT = 'invalid_grant';
  private readonly ERRO_TOKEN_EXPIRADO = 'Token expirado';
  
  private readonly AVISO_TOKEN_EXPIRADO = 'Sessão expirada!';
  
  private readonly OPERACAO_NAO_PERMITIDA = 'Operadoção não permitida!';
  private readonly USUARIO_NAO_TEM_PERMISSAO = 'Usuário tem permissão para está operação!';
  
  constructor(private readonly router: Router,
              private readonly toastrService: ToastrService,
              private readonly autenticadorService: AutenticadorService) {
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse && errorResponse.status === StatusCodes.FORBIDDEN) {
            this.toastrService.warning(this.USUARIO_NAO_TEM_PERMISSAO, this.LABEL_AVISO);
            return throwError(this.OPERACAO_NAO_PERMITIDA);
          }
          
          if (errorResponse && errorResponse.status === StatusCodes.BAD_REQUEST && errorResponse.error.mensagem) {
            this.toastrService.warning(errorResponse.error.mensagem, this.LABEL_AVISO);
            return throwError(this.OPERACAO_NAO_PERMITIDA);
          }
          
          if (this.loginInvalido(errorResponse)) {
            this.autenticadorService.eventUsuarioLoginInvalido.emit(errorResponse.error);
            const {error_description} = errorResponse.error;
            return throwError(error_description);
          }
          
          if (this.refreshTokenExpirado(request)) {
            this.autenticadorService.usuarioLogado.next(false);
            this.toastrService.warning(this.AVISO_TOKEN_EXPIRADO, this.LABEL_AVISO);
            this.router.navigate(['/login']);
            return throwError(this.ERRO_TOKEN_EXPIRADO);
          }
          
          if (this.tokenExpirado(errorResponse)) {
            return throwError(this.ERRO_TOKEN_EXPIRADO);
          }
          
          this.toastrService.error(this.ERRO_DE_SISTEMA, this.LABEL_ERRO);
          return throwError(this.ERRO_DE_SISTEMA);
        })
      );
  }
  
  private loginInvalido(errorResponse: HttpErrorResponse) {
    return errorResponse
      && errorResponse.status === StatusCodes.BAD_REQUEST
      && errorResponse.error['error'] === this.ERRO_INVALID_GRANT
      && notEmpty(errorResponse.error['error_description']);
  }
  
  private tokenExpirado(errorResponse: HttpErrorResponse) {
    return errorResponse
      && errorResponse.status === StatusCodes.UNAUTHORIZED
      && errorResponse.url !== Api.URLS.oauth.token
      && this.autenticadorService.accessTokenExpirado();
  }
  
  private refreshTokenExpirado(request: HttpRequest<any>) {
    return request
      && request.method === 'POST'
      && request.url === Api.URLS.oauth.token
      && request.body === REFRESH_TOKEN_PAYLOAD
      && this.autenticadorService.accessTokenExpirado();
  }
  
}
