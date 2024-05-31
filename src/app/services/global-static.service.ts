import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GlobalStaticService {

  constructor(
    private http: HttpClient
  ) { }

  public getStaticByType(type: string): Observable<{ data: any }> {
    return this.http.get<{ data: any }>(`${environment.api}/api/global-statics/get/statics/type/${type}`)
  }
}
