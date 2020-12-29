import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {StatusCodes} from "http-status-codes/build/cjs";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  private readonly LABEL_ERRO = 'Erro';
  private readonly LABEL_AVISO = 'Aviso';
  private readonly ERRO_DE_SISTEMA = 'Erro de sistema';
  private readonly OPERACAO_NAO_PERMITIDA = 'Operadoção não permitida!';
  private readonly USUARIO_NAO_TEM_PERMISSAO = 'Usuário tem permissão para está operação!';

  constructor(private toast: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === StatusCodes.FORBIDDEN) {
            this.toast.warning(this.USUARIO_NAO_TEM_PERMISSAO,this.LABEL_AVISO);
            return throwError(this.OPERACAO_NAO_PERMITIDA);
          }

          if (error && error.status === StatusCodes.BAD_REQUEST && error.error.mensagem) {
            this.toast.warning(error.error.mensagem,this.LABEL_AVISO);
            return throwError(this.OPERACAO_NAO_PERMITIDA);
          }

          this.toast.error(this.ERRO_DE_SISTEMA, this.LABEL_ERRO);
          return throwError(this.ERRO_DE_SISTEMA);
        })
      );
  }

}
