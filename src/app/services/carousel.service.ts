import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private _http: HttpClient) {}

  public createCarouselImage(type: string, data: FormData): Observable<any> {
    return this._http.post(
      `${environment.api}/api/img-carousel/post/add/${type}`,
      data
    );
  }
}
