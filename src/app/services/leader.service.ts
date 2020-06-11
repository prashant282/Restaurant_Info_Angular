import { LEADERS } from './../shared/leaders';
import { Leader } from './../shared/leader';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Promise<Leader[]>{
    return new Promise(resolve=>{
      // Simulate server latency
      setTimeout(()=>resolve(LEADERS),2000);
    });
  }

  getLeader(id: string):  Promise<Leader>{
    return new Promise(resolve=>{
      // Simulate server latency
      setTimeout(()=>resolve(LEADERS.filter((dish) => (dish.id===id))[0]),2000);
    });
  }

  getFeaturedLeader():  Promise<Leader>{
    return new Promise(resolve=>{
      // Simulate server latency
      setTimeout(()=>resolve(LEADERS.filter((dish) =>(dish.featured))[0]),2000);
    });
  }
  
}
