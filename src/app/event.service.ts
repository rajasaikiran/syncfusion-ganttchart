import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public httpClient: HttpClient) { }

  private authorizedUrl: string = "https://outofoffice-backend.azurewebsites.net/api/OutlookCalendarEvents/OofEvents(All)?";

  public calendarEvents(): Observable<any> {
    return this.httpClient.get<any>(this.authorizedUrl);
  }

  public calendarEventWithParams(startDate: any, endDate: any): Observable<any> {
    return this.httpClient.get<any>(this.authorizedUrl + 'start=' + startDate + '&' + 'end=' + endDate);
  }

}
