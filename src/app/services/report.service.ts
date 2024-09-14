import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReport } from '../interfaces/report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private _http: HttpClient) {}

  public sendReport(data: IReport, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/report/post/add`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } });
  }

  public getReports(
    limit: number,
    page: number,
    filter?: string
  ): Observable<any> {
    let query: any = {};
    if (filter && filter !== '') query.name = filter;
    return this._http.get(
      `${environment.api}/api/report/get/list/${page}/${limit}`,
      { params: query }
    );
  }

  public setActions(id: string, action: string, _csrf: string): Observable<any> {
    return this._http.put(
      `${environment.api}/api/report/put/set-action/${id}`,
      { action }, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }
}
