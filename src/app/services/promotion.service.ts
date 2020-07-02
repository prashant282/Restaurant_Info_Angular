import { baseUrl } from './../shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { HttpClient } from '@angular/common/http';
import { PROMOTIONS } from './../shared/promotions';
import { Promotion } from './../shared/promotion';

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay,map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }
  
  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseUrl+"promotions")
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
  getPromotion(id: string): Observable<Promotion>{
    return this.http.get<Promotion>(baseUrl+ "promotions/"+id)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion[]>(baseUrl+"promotions?featured=true")
      .pipe(map(promotions=> promotions[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
  

}
