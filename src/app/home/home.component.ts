import { LeaderService } from './../services/leader.service';
import { PromotionService } from './../services/promotion.service';
import { Promotion } from './../shared/promotion';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block'

  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotionErrMess: string;
  promotion:Promotion;
  leader: Leader;
  leaderErrMess: string;

  constructor(private dishService:DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(dish=> this.dish=dish,
        errmess=> this.dishErrMess=<any>errmess);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion=> this.promotion= promotion,
        errmess=> this.promotionErrMess=errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe(leader=> this.leader=leader,
      errmess=> this.leaderErrMess=errmess);
  }

}
