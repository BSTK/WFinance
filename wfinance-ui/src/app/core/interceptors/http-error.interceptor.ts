import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {StatusCodes} from "http-status-codes/build/cjs";
import {notEmpty} from "../../shared/utils/object-utils";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AutenticadorService} from "../../modules/seguranca/domain/autenticador.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  private readonly LABEL_ERRO = 'Erro';
  private readonly LABEL_AVISO = 'Aviso';

  private readonly ERRO_INVALID_GRANT = 'invalid_grant';
  private readonly ERRO_DE_SISTEMA = 'Erro de sistema';

  private readonly OPERACAO_NAO_PERMITIDA = 'Operadoção não permitida!';
  private readonly USUARIO_NAO_TEM_PERMISSAO = 'Usuário tem permissão para está operação!';

  constructor(private readonly toast: ToastrService,
              private readonly autenticadorService: AutenticadorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse && errorResponse.status === StatusCodes.FORBIDDEN) {
            this.toast.warning(this.USUARIO_NAO_TEM_PERMISSAO,this.LABEL_AVISO);
            return throwError(this.OPERACAO_NAO_PERMITIDA);
          }

          if (errorResponse && errorResponse.status === StatusCodes.BAD_REQUEST && errorResponse.error.mensagem) {
            this.toast.warning(errorResponse.error.mensagem,this.LABEL_AVISO);
            return throwError(this.OPERACAO_NAO_PERMITIDA);
          }

          if (this.loginInvalido(errorResponse)) {
            this.autenticadorService.eventUsuarioLoginInvalido.emit(errorResponse.error);
            const { error_description } = errorResponse.error;
            return throwError(error_description);
          }

          this.toast.error(this.ERRO_DE_SISTEMA, this.LABEL_ERRO);
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

}
