import { ITokenClaims } from './../interfaces/token';
import { TokenService } from './../services/token.service';
import { inject } from '@angular/core'
import { Router } from '@angular/router';

export const customerGuard = () => {
  const _token = inject(TokenService)
  const _router = inject(Router)
  let claims: ITokenClaims = _token.decodedToken()

  if(claims.access.includes('customer')) {
    return true;
  } else {
    _router.navigateByUrl('/')
    return false;
  }
}