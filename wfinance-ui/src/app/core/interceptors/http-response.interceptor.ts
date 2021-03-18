import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AutenticadorService} from '../../modules/seguranca/services/autenticador.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseInterceptor implements HttpInterceptor {
  
  constructor(private readonly router: Router,
              private readonly autenticadorService: AutenticadorService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          console.log('HttpResponse = ', response);
          console.log('HttpResponse = ', response);
        }
        
        return response;
      }),
    );
  }
  
}
