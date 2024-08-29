import { ITokenClaims } from './../interfaces/token';
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { TokenService } from "../services/token.service"

export const isAdminGuard = async () => {
  const _token = inject(TokenService)
  const _router = inject(Router)
  let claims: ITokenClaims | string = <ITokenClaims | string>_token.decodedToken()
  if(claims === '') {
    return true
  } else {
    if((<ITokenClaims>claims).access.includes('admin')) {
      _router.navigateByUrl('/admin/home')
      return false
    }
    return true
  }
}