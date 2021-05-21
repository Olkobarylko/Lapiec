import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProd } from '../interfaces/product/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  changeBusket$ = new Subject<boolean>();
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }

  addLocalBasket(prod: IProd): void {
    let prods: Array<IProd> = [];
    if (localStorage.getItem('basket')) {
      prods = JSON.parse(localStorage.getItem('basket'));
      if (prods.some(product => product.id === prod.id)) {
        const INDEX = prods.findIndex(product => product.id === prod.id);
        prods[INDEX].count += prod.count;
      }
      else {
        prods.push(prod);
      }
    }
    else {
      prods.push(prod);
    }
    localStorage.setItem('basket', JSON.stringify(prods))
  }

  getOrders(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url);
  }

  postOrder(order: any): Observable<any> {
    return this.http.post<any>(this.url, order);
  }

  deleteOrder(order:any):Observable<any>{
    return this.http.delete<any>(`${this.url}/${order.id}`)
  }

}
