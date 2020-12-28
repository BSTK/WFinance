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

  constructor(private toast: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === StatusCodes.FORBIDDEN) {
            this.toast.warning('Usuário tem permissão para está operação!','Aviso');
            return throwError('Operadoção não permitida!');
          }
          else {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            this.toast.error(errorMessage, 'Erro de sistema');
            return throwError(errorMessage);
          }
        })
      );
  }

}
