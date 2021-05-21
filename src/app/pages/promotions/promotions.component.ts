import { Component, OnInit } from '@angular/core';
import { IProm } from 'src/app/shared/interfaces/promotions/promotions.interfaces';
import { PromotionsService } from 'src/app/shared/services/promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promArray: Array<IProm>
  constructor(private promotionServices: PromotionsService) { }

  ngOnInit(): void {
    this.getDiscounts();
  }
  getDiscounts(): void {
    this.promotionServices.getProm().subscribe(
      data => {
        this.promArray = data;
        console.log(this.promArray);

      },
      error => {
        console.log(error);
      }
    );
  }
  
}
