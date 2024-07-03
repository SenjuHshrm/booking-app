import { ITokenClaims } from './../interfaces/token';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public decodedToken(): ITokenClaims | string {
    let t: string = <string>localStorage.getItem('ACCESS_TOKEN')
    return (t === null) ? '' : <ITokenClaims>jwtDecode(t);
  }

  public getToken(): string {
    return <string>localStorage.getItem('ACCESS_TOKEN')
  }

  public saveToken(t: string) {
    localStorage.setItem('ACCESS_TOKEN', t)
  }

  public removeToken() {
    localStorage.removeItem('ACCESS_TOKEN')
  }
  
}
