import { TokenService } from './../services/token.service';
import { inject } from '@angular/core'
import { Router } from '@angular/router';

export const authGuard = async () => {
  const _router = inject(Router)
  const _token = inject(TokenService)

  if(_token.getToken() !== null) {
    return true
  } else {
    _router.navigateByUrl('/home')
    return false
  }
  
}