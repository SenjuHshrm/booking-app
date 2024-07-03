import { ITokenClaims } from './../interfaces/token';
import { TokenService } from './../services/token.service';
import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const adminLoginGuard = () => {
  const _router = inject(Router)
  const _token = inject(TokenService)

  if(_token.getToken() !== null && (<ITokenClaims>_token.decodedToken()).access.includes('admin')) {
    _router.navigateByUrl('/admin/home')
    return false
  } else {
    return true
  }
}