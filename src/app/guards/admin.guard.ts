import { ITokenClaims } from './../interfaces/token';
import { TokenService } from './../services/token.service';
import { inject } from '@angular/core'
import { Router } from '@angular/router';

export const adminGuard = async () => {
  const _token = inject(TokenService)
  const _router = inject(Router)
  let claims: ITokenClaims = <ITokenClaims>_token.decodedToken()

  if(claims.access.includes('admin')) {
    return true;
  } else {
    _router.navigateByUrl('/')
    return false;
  }
}