import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageInput } from '../interfaces/message';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _http: HttpClient) {}

  public messageProprietor(
    data: IMessageInput,
    receiverId: string,
    _csrf: string
  ): Observable<any> {
    return this._http.post(
      `${environment.api}/api/message/post/send-msg/${receiverId}`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public sendMessage(data: IMessageInput, receiverId: string, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/message/post/send-msg/${receiverId}`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getMessageRoomsByUserId(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/message/get/rooms/${id}`);
  }

  public getRoomMessages(
    id: string,
    limit: number,
    page: number
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/message/get/message-thread/${id}/${page}/${limit}`
    );
  }
}
