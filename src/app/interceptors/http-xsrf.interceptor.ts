import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headerName = 'XSRF-TOKEN', respHeaderName = 'X-XSRF-TOKEN';
    if(request.method === 'GET' || request.method === 'OPTIONS' || request.method === 'HEAD') {
      return next.handle(request)
    }
    let token = this.tokenExtractor.getToken()
    console.log(token)
    if(token !== null && !request.headers.has(headerName)) {
      request = request.clone({ setHeaders: { [respHeaderName]: token } })
    }
    return next.handle(request);
  }
}
