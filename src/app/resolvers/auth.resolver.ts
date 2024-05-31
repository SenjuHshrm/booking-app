import { TokenService } from './../services/token.service';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const authResolver = () => {
  const auth = inject(AuthService)
  const token = inject(TokenService)
  if(token.getToken() !== null) {
    return auth.checkUser().pipe(
      filter((val : { isAuth: boolean } | { code: string }) => (<{ isAuth: boolean }>val).isAuth),
      switchMap(async () => true),
      catchError(async () => false)
    )
  }
  return of(false)
  
}
