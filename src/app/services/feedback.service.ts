import { Injectable } from '@angular/core';


import { Feedback } from '../shared/feedback';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';



@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }



  SubmitFeedback(Feedback: Feedback): Observable<Feedback> {
   

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post<Feedback>(baseURL + 'feedback/', Feedback, httpOptions)
  .pipe(catchError(this.processHTTPMsgService.handleError));
}




}
