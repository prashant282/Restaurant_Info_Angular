import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { baseUrl } from './../shared/baseurl';
import { Feedback } from './../shared/feedback';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.post<Feedback>(baseUrl+"feedback",feedback,httpOptions);
  }
}
