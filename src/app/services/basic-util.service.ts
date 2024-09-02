import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IUserFullName } from '../interfaces/user';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BasicUtilService {
  constructor() {}

  public constructName(data: IUserFullName): string {
    if (data.mName === '')
      return data.xName === ''
        ? `${data.fName} ${data.lName}`
        : `${data.fName} ${data.lName}, ${data.xName}`;
    return data.xName === ''
      ? `${data.fName} ${data.mName?.charAt(0)}. ${data.lName}`
      : `${data.fName} ${data.mName?.charAt(0)}. ${data.lName}, ${data.xName}`;
  }

  public setImgUrl(img: string): string {
    let gravatarMatcher = new RegExp(/gravatar/gi);
    let httpsMatcher = new RegExp(/https/gi);
    if (gravatarMatcher.test(img) || httpsMatcher.test(img)) {
      return img;
    }
    return `${environment.api}${img}`;
  }

  public profileImgFilename(file: File): string {
    let origFilename = file.name;
    let i = origFilename.lastIndexOf('.');
    let format = origFilename.substring(i, origFilename.length);
    return `${new Date().getTime()}${format}`;
  }

  public calculateUserDuration(createdAt: string): string {
    let res: string = 'New on TaraGo';
    let start = moment(createdAt);
    let end = moment(new Date());
    let durationDays = end.diff(start, 'days');
    let durationWeeks = end.diff(start, 'weeks');
    let durationMonths = end.diff(start, 'months');
    let durationYears = end.diff(start, 'years');
    if (
      durationDays >= 1 &&
      durationWeeks === 0 &&
      durationMonths === 0 &&
      durationYears === 0
    ) {
      res = `${durationDays} ${durationDays > 1 ? 'days' : 'day'} on TaraGo`;
    } else if (
      durationDays > 1 &&
      durationWeeks >= 1 &&
      durationMonths === 0 &&
      durationYears === 0
    ) {
      res = `${durationWeeks} ${
        durationWeeks > 1 ? 'weeks' : 'week'
      } on TaraGo`;
    } else if (
      durationDays > 1 &&
      durationWeeks > 4 &&
      durationMonths >= 1 &&
      durationYears === 0
    ) {
      res = `${durationMonths} ${
        durationMonths > 1 ? 'months' : 'month'
      } on TaraGo`;
    } else if (
      durationDays > 1 &&
      durationWeeks > 4 &&
      durationMonths > 1 &&
      durationYears >= 1
    ) {
      res = `${durationYears} ${
        durationYears > 1 ? 'years' : 'year'
      } on TaraGo`;
    }
    return res;
  }

  public propToReadable(key: string): string {
    let arr: string[] = key.split('_');
    let res: string[] = [];
    arr.forEach((val: string) => {
      res.push(val.charAt(0).toUpperCase() + val.slice(1));
    });
    return res.join(' ');
  }

  public readableToProp(name: string): string {
    let lowerCase = name.toLowerCase();
    return lowerCase.replace(/\s/g, '_');
  }

  public getTotalBeforeTax(total: number, sc: any): number {
    let res: number = 0;
    sc.forEach((s: any) => {
      res += s.price;
    });
    return total + res;
  }

  public constructAddress(addr: any): string {
    let props: string[] = [
      'unit',
      'street',
      'brgy',
      'city',
      'province',
      'country',
      'zip',
    ];
    let res: string[] = [];

    for (let i: number = 0; i < props.length; i++) {
      Object.keys(addr).forEach((key: string) => {
        if (key === props[i]) {
          if (addr[key] !== '') {
            res.push(addr[key]);
          }
        }
      });
    }
    return res.join(', ');
  }

  public placetype: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public getPlaceType = this.placetype.asObservable();

  public setPlaceType(pt: string) {
    this.placetype.next(pt);
  }

  public taxTotal(price: number, taxes: any): number {
    let res: number = 0;
    taxes.forEach((x: any) => {
      if (x.type === 'fixed') {
        res += x.price;
      } else {
        let perc: number = (x.price / 100) * price;
        res += perc;
      }
    });
    // return Math.ceil(res)
    return res;
  }

  public isFormInputValid(form: FormGroup, field: string): boolean {
    return (
      form.controls[field].invalid &&
      (form.controls[field].touched || form.controls[field].dirty)
    );
  }

  public calculateMessageDuration(createdAt: string): string {
    let res: string = 'New Message';
    const now = moment();
    const created = moment(createdAt);
    const diffSeconds = now.diff(created, 'seconds');
    const diffMinutes = now.diff(created, 'minutes');
    const diffHours = now.diff(created, 'hours');
    const diffDays = now.diff(created, 'days');

    let returnPlural = (num: number): string => {
      return num > 1 ? 's' : '';
    };

    if (diffSeconds < 60) {
      res = `${diffSeconds} second${returnPlural(diffSeconds)} ago`;
    } else if (diffMinutes < 60) {
      res = `${diffMinutes} minute${returnPlural(diffMinutes)} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${returnPlural(diffHours)} ago`;
    } else {
      res = `${diffDays} day${returnPlural(diffDays)} ago`;
    }
    return res;
  }
}
