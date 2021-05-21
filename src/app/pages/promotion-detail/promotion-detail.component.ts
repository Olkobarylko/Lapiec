import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProm } from 'src/app/shared/interfaces/promotions/promotions.interfaces';
import { PromotionsService } from 'src/app/shared/services/promotions.service';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.scss']
})
export class PromotionDetailComponent implements OnInit {
  oneProm: IProm = null;
  constructor(private ActiveRoute: ActivatedRoute,
    private promService: PromotionsService) { }

  ngOnInit(): void {
    this.renderOneProm();
  }

  renderOneProm(): void {
    const ID = this.ActiveRoute.snapshot.paramMap.get('id');
    this.promService.getPromDetail(ID).subscribe(
      data => {
        this.oneProm = data;
        console.log(data);
      }
    );
  }

}
