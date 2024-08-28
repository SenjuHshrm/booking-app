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

  public sendReport(data: IReport): Observable<any> {
    return this._http.post(`${environment.api}/api/report/post/add`, data);
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

  public setActions(id: string, action: string): Observable<any> {
    return this._http.put(
      `${environment.api}/api/report/put/set-action/${id}`,
      { action }
    );
  }
}
