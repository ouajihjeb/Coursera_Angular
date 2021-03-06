import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { flyInOut,expand } from '../animations/app.animation';
//import { Component, OnInit, Inject } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },

  animations: [
    flyInOut(),
    expand()
  ]

})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errMessDish: string;




  constructor(private dishservice: DishService, @Inject('BaseURL') public BaseURL,
    private promotionservice: PromotionService, private leaderservice: LeaderService) { }

  ngOnInit(): void {
   this.dishservice.getFeaturedDish()
   .subscribe(dishes=> this.dish =dishes, errmess=>this.errMessDish= <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotions=>this.promotion=promotions);
 this.leaderservice.getFeaturedLeader().subscribe(leaders=>this.leader=leaders);
  }

}