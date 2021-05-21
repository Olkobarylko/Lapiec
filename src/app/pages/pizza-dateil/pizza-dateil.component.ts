import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProd } from 'src/app/shared/interfaces/product/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-pizza-dateil',
  templateUrl: './pizza-dateil.component.html',
  styleUrls: ['./pizza-dateil.component.scss']
})
export class PizzaDateilComponent implements OnInit {
  oneProd: IProd = null;
  productArray: Array<IProd> = [];
  constructor(private prodService: ProductService,
    private ActiveRoute: ActivatedRoute,
    private OrderService: OrderService) { }

  ngOnInit(): void {
    this.renderOneProd();
  }
  renderOneProd(): void {
    const ID = this.ActiveRoute.snapshot.paramMap.get('id');
    this.prodService.getProdDetail(ID).subscribe(
      data => {
        this.oneProd = data;
      }
    );
  }


  getProduct(): void {
    this.prodService.getProduct().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].category.urlName == "pizza") {
            this.productArray.push(data[i]);
          }
        }
        console.log(this.productArray);
      },
      error => {
        console.log(error);
      }
    )
  }

  changeProductCount(prod: IProd, status: boolean): void {
    if (status) {
      prod.count++;
    }
    else {
      if (prod.count > 1) {
        prod.count--;
      }
    }
  }

  addToBusket(prod: IProd): void {
    this.OrderService.addLocalBasket(prod);
    this.OrderService.changeBusket$.next(true);
    prod.count = 1;

  }
}
