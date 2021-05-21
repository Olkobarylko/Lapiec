import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  ordersArray: Array<any> = [];
  totalPrice: number;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.orderService.getOrders().subscribe(
      data => {
        this.ordersArray = data;
        console.log(this.ordersArray);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteOrder(order): void {
    this.orderService.deleteOrder(order).subscribe(() => {
      this.getOrders();
    },
      error => {
        console.log(error);
      })
  }
}
