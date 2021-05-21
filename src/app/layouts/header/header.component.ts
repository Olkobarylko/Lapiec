import { Component, HostListener, OnInit } from '@angular/core';
import { IProd } from 'src/app/shared/interfaces/product/product.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  basket: Array<IProd> = [];
  totalPrice = 0;
  loginName: string;
  loginPath: string;
  checkBurger: boolean;
  constructor(private orderService: OrderService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.getLocalStotage();
    this.checkBasket();
    this.getLocalUser();
    this.checkUser();
  }


  getLocalUser(): void {
    if (localStorage.getItem('user')) {
      this.loginName = 'Профіль';
      this.loginPath = 'profile';
    }
    else if (localStorage.getItem('admin')) {
      this.loginName = 'Admin';
      this.loginPath = 'admin';
    }
    else {
      this.loginName = 'Увійти';
      this.loginPath = 'login';
    }
  }

  checkUser(): void {
    this.auth.loginStatus$.subscribe(() => {
      this.getLocalUser();
    })
  }

  checkBasket(): void {
    this.orderService.changeBusket$.subscribe(() => {
      this.getLocalStotage();
    })
  }
  getLocalStotage(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.getTotal();
    }
  }
  getTotal(): void {
    this.totalPrice = this.basket.reduce((total, prod) => total + (prod.price * prod.count), 0)
  }

  hideBurger(): void {
    this.checkBurger = false;
  }
}
