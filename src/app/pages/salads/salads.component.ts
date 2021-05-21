import { Component, OnInit } from '@angular/core';
import { IProd } from 'src/app/shared/interfaces/product/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.scss']
})
export class SaladsComponent implements OnInit {
  productArray: Array<IProd> = [];
  constructor(private prodService: ProductService,
    private orderServices: OrderService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(): void {
    this.prodService.getProduct().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].category.urlName == "salads") {
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
    this.orderServices.addLocalBasket(prod);
    this.orderServices.changeBusket$.next(true);
    prod.count = 1;
  }

}
