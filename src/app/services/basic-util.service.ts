import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IUserFullName } from '../interfaces/user';
import * as moment from 'moment'

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

  public profileImgFilename(file: File): string {
    let origFilename = file.name
    let i = origFilename.lastIndexOf('.')
    let format = origFilename.substring(i, origFilename.length)
    return `${new Date().getTime()}${format}`
  }

  public calculateUserDuration(createdAt: string): string {
    let res: string = 'New on TaraGo'
    let start = moment(createdAt)
    let end = moment(new Date())
    let durationDays = end.diff(start, 'days')
    let durationWeeks = end.diff(start, 'weeks')
    let durationMonths = end.diff(start, 'months')
    let durationYears =  end.diff(start, 'years')
    if(durationDays >= 1 && durationWeeks === 0 && durationMonths === 0 && durationYears === 0) {
      res = `${durationDays} ${(durationDays > 1) ? 'days' : 'day'} on TaraGo`
    } else if(durationDays > 1 && durationWeeks >= 1 && durationMonths === 0 && durationYears === 0) {
      res = `${durationWeeks} ${(durationWeeks > 1) ? 'weeks' : 'week'} on TaraGo`
    } else if(durationDays > 1 && durationWeeks > 4 && durationMonths >= 1 && durationYears === 0) {
      res = `${durationMonths} ${(durationMonths > 1) ? 'months' : 'month'} on TaraGo`
    } else if(durationDays > 1 && durationWeeks > 4 && durationMonths > 1 && durationYears >= 1) {
      res = `${durationYears} ${(durationYears > 1) ? 'years' : 'year'} on TaraGo`
    }
    return res;
  }
}
