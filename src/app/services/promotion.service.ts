import { PROMOTIONS } from './../shared/promotions';
import { Promotion } from './../shared/promotion';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  
  getPromotions(): Promise<Promotion[]>{
    return new Promise(resolve=>{
      // Simulate server latency
      setTimeout(()=>resolve(PROMOTIONS),2000);
    });
  }
  getPromotion(id: string): Promise<Promotion>{
    return new Promise(resolve=>{
      // Simulate server latency
      setTimeout(()=>resolve(PROMOTIONS.filter((dish) => (dish.id===id))[0]),2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion>{
    return new Promise(resolve=>{
      // Simulate server latency
      setTimeout(()=>resolve(PROMOTIONS.filter((dish) =>(dish.featured))[0]),2000);
    });
  }
  

}
