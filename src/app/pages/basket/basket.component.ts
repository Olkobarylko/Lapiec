import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IProd } from 'src/app/shared/interfaces/product/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: Array<IProd> = [];
  totalPrice: number;
  street: string;
  checkDis: boolean;
  checkName: boolean;
  checkTel: boolean;
  checkNameTelDis: boolean;
  firstName: string;
  phone: string;
  date: string | number;
  time: string | number;
  comment: string;
  city: string = "Львів";
  home: string | number;
  checkBasketBoolean: boolean;
  empty = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getLocalStotage();
    this.checkBasket();
    this.checkLocalUser();
    this.checkStatusBasket();
  }

  checkLocalUser(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      this.street = user.street;
      this.firstName = user.firstName;
      this.city = user.city;
      this.phone = user.phone;
      this.home = user.number_home;
      this.onChange(user.street);
    }
  }

  checkBasket(): void {
    this.orderService.changeBusket$.subscribe(() => {
      this.getLocalStotage();
      this.checkStatusBasket();
    })
  }

  getLocalStotage(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.getTotal();
    }
  }

  checkStatusBasket(): void {
    if (this.basket.length == 0) {
      this.checkBasketBoolean = true;
    }
    else {
      this.checkBasketBoolean = false;
    }
  }

  getTotal(): void {
    this.totalPrice = this.basket.reduce((total, prod) => total + (prod.price * prod.count), 0)
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
    this.updateLocalBasket();
  }

  deleteProd(prod: IProd): void {
    const INDEX = this.basket.findIndex(product => product.id === prod.id);
    this.basket.splice(INDEX, 1);
    this.updateLocalBasket();

  }

  updateLocalBasket(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBusket$.next(true);
  }

  onChangePhone(newValue) {
    if (newValue.length > 0) {
      this.checkTel = true;
    }
    else {
      this.checkTel = false;
    }
    this.checkAllChange();
  }

  onChangefirstName(newValue) {
    if (newValue.length > 0) {
      this.checkName = true;
    }
    else {
      this.checkName = false;
    }
    this.checkAllChange();
  }

  onChange(newValue) {
    if (newValue.length > 0) {
      this.checkDis = true;
    }
    else {
      this.checkDis = false;
    }
    this.checkAllChange();
  }

  checkAllChange(): void {
    if (this.checkDis && this.checkName && this.checkTel) {
      this.checkNameTelDis = true;
    }
    else {
      this.checkNameTelDis = false;
    }
    if (this.phone.length > 0 && this.firstName.length > 0 && this.street.length > 0) {
      this.checkNameTelDis = true;
    }
  }

  orderProducts(): void {
    const Ord = {
      basket: this.basket,
      street: this.street,
      firstName: this.firstName,
      phone: this.phone,
      date: this.date,
      time: this.time,
      comment: this.comment,
      city: this.city,
      home: this.home,
      totalPrice: this.totalPrice
    }
    console.log(Ord);
    this.orderService.postOrder(Ord).subscribe(
      () => {
        this.resetForm();
        this.updateLocalBasket();

      }
    )
    this.resetForm();
  }
  resetForm(): void {
    this.street = '';
    this.firstName = '';
    this.phone = '';
    this.date = '';
    this.time = '';
    this.comment = '';
    this.city = '';
    this.home = '';
    this.basket = [];
    this.checkDis = false;
  }
}
