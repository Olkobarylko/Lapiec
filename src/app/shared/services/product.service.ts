import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProd } from '../interfaces/product/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/products";
  }

  getProduct(): Observable<Array<IProd>> {
    return this.http.get<Array<IProd>>(this.url);
  }
  postProd(newProd: IProd): Observable<IProd> {
    return this.http.post<IProd>(this.url, newProd);
  }
  getProdDetail(id: number | string): Observable<IProd> {
    return this.http.get<IProd>(`${this.url}/${id}`);
  }

  deleteProduct(id: string | number): Observable<IProd> {
    return this.http.delete<IProd>(`${this.url}/${id}`)
  }
  saveEditProduct(editProd: IProd): Observable<IProd> {
    return this.http.put<IProd>(`${this.url}/${editProd.id}`, editProd);
  }

}
