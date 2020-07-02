import { baseUrl } from './../shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { HttpClient } from '@angular/common/http';
import { LEADERS } from './../shared/leaders';
import { Leader } from './../shared/leader';
import { Injectable } from '@angular/core';
import {of, Observable} from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }

  getLeaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseUrl+"leadership")
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getLeader(id: string):  Observable<Leader>{
    return this.http.get<Leader>(baseUrl+"leadership/"+id)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedLeader():  Observable<Leader>{
    return this.http.get<Leader[]>(baseUrl+"leadership?featured=true")
      .pipe(map(leaders=> leaders[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
  
}
