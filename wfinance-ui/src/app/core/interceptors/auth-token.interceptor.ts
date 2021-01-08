import {Api} from "../../api";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {KEY_OAUTH_ACCESS_TOKEN} from "../../shared/utils/constants/seguranca.constants";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {
  HTTP_HEADER_APPLICATION_FORM_URLENCODED,
  HTTP_HEADER_AUTHORIZATION,
  HTTP_HEADER_BEARER,
  HTTP_HEADER_CONTENT_TYPE
} from "../../shared/utils/constants/http-headers.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request && request.url === Api.URLS.oauth.token) {
      const headers = new HttpHeaders()
        .append(HTTP_HEADER_AUTHORIZATION, environment.httpWfinanceApiKey)
        .append(HTTP_HEADER_CONTENT_TYPE, HTTP_HEADER_APPLICATION_FORM_URLENCODED);

      const newRequest = request.clone({ headers });
      return next.handle(newRequest);
    }

    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER.concat(localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN)));

    const newRequest = request.clone({ headers });
    return next.handle(newRequest);
  }

}
