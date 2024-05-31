import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IUserFullName } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BasicUtilService {

  constructor() { }

  public constructName(data: IUserFullName): string {
    if(data.mName === '') return (data.xName === '') ? `${data.fName} ${data.lName}` : `${data.fName} ${data.lName}, ${data.xName}`
    return (data.xName === '') ? `${data.fName} ${data.mName?.charAt(0)}. ${data.lName}` : `${data.fName} ${data.mName?.charAt(0)}. ${data.lName}, ${data.xName}`
  }

  public setImgUrl(img: string): string {
    let matcher = new RegExp(/gravatar/)
    if(matcher.test(img)) {
      return img
    }
    return `${environment.api}${img}`
  }
}
