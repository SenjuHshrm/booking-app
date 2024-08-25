import { AuthService } from './../services/auth.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpContextToken
} from '@angular/common/http';
import { BehaviorSubject, Observable, EMPTY, throwError, of } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators'
import { environment } from './../../environments/environment'

export const BYPASS_LOG = new HttpContextToken(() => false)

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private exemptedURL!: string[]
  private requestAccess: boolean = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  constructor(
    private _token: TokenService,
    private _auth: AuthService
  ) {
    this.exemptedURL = [
      `${environment.api}/api/staycation/post/apply`,
      `${environment.api}/api/user/post/add/admin`,
      `${environment.api}/api/user/put/update-profile`
    ]
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(BYPASS_LOG) === true) return next.handle(request)
    let authReq = this._addAuthToken(request)
    return next.handle(authReq).pipe(
      catchError((e: HttpErrorResponse): Observable<any> => {
        if(
          request.url !== `${environment.api}/api/auth/post/login` &&
          request.url !== `${environment.api}/api/user/post/add`
        ) {
          if(e instanceof HttpErrorResponse && e && e.status === 401) return this._handleUnauthorized(authReq, next)
          if(e.status === 403) {
            localStorage.clear()
            return EMPTY
          }
        }
        return throwError(() => e)
      })
    )
  }

  private _addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    if(!this._checkExemptedURL(req.url)) {
      if(!req.headers.has('Content-Type')) {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      }
    }
    let access: string = <string>this._token.getToken()
    if(access === null) {
      return req
    }
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${access}`
      }
    })
  }

  private _handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.requestAccess) {
      this.requestAccess = true
      this.refreshTokenSubject.next(null)
      return this._auth.requestAccessToken().pipe(
        switchMap((res: { token: string } | { code: string }) => {
          this.requestAccess = false
          this._token.saveToken((<{ token: string }>res).token)
          this.refreshTokenSubject.next((<{ token: string }>res).token)
          return next.handle(this._addAuthToken(req))
        })
      )
    }
    return this.refreshTokenSubject.pipe(
      filter((token: string | null) => token !== null),
      take(1),
      switchMap(() => next.handle(this._addAuthToken(req)))
    )
  }

  private _checkExemptedURL(url: string): boolean {
    let res: boolean = false;
    for(let i: number = 0; i < this.exemptedURL.length; i++) {
      if(url.match(this.exemptedURL[i])) {
        res = true;
        break;
      }
    }
    return res
  }
}




// export const requestInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
//   const _token = inject(TokenService)
//   const _auth = inject(AuthService)

//   const exemptedURL: string[] = [
//     `${environment.api}/api/staycation/post/apply`
//   ]
//   let requestAccess: boolean = false;
//   let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  
//   const _addAuthToken = (req: HttpRequest<any>): HttpRequest<any> => {
//     if(_checkExemptedURL(req.url)) {
//       if(!req.headers.has('Content-Type')) {
//         req = req.clone({
//           headers: req.headers.append('Content-Type', 'application/json; charset=utf-8')
//         })
//       }
//     }
//     let access: string = <string>_token.getToken()
//     if(!access) return req
//     return req.clone({
//       headers: req.headers.append('Authorization', `Bearer ${access}`)
//     })
//   }

//   const _handleUnauthorized = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
//     if(!requestAccess) {
//       requestAccess = true;
//       refreshTokenSubject.next(null)
//       return _auth.requestAccessToken().pipe(
//         switchMap((res: { token: string } | { code: string }) => {
//           requestAccess = false
//           _token.saveToken((<{ token: string }>res).token)
//           refreshTokenSubject.next((<{ token: string }>res).token)
//           return next(_addAuthToken(req))
//         })
//       )
//     }
//     return refreshTokenSubject.pipe(
//       filter((token: string | null) => token !== null),
//       take(1),
//       switchMap(() => next(_addAuthToken(req)))
//     )
//   }

//   const _checkExemptedURL = (url: string): boolean => {
//     let res: boolean = false;
//     for(let i: number = 0; i < exemptedURL.length; i++) {
//       if(url.match(exemptedURL[i])) {
//         res = true;
//         break
//       }
//     }
//     return res
//   }

//   let authReq = _addAuthToken(request)
//   return next(request).pipe(
//     catchError((e: HttpErrorResponse): Observable<any> => {
//       if(
//         request.url
//       ) {

//       }
//     })
//   )
// }