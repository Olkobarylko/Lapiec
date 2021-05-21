import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProm } from '../interfaces/promotions/promotions.interfaces';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private urlProm: string;
  constructor(private http: HttpClient) {
    this.urlProm = 'http://localhost:3000/promotions';
  }
  getProm(): Observable<Array<IProm>> {
    return this.http.get<Array<IProm>>(this.urlProm);
  }
  addProm(newUser: IProm): Observable<IProm> {
    return this.http.post<IProm>(this.urlProm, newUser);
  }
  deleteProm(id: number | string): Observable<IProm> {
    return this.http.delete<IProm>(`${this.urlProm}/${id}`);
  }
  getPromDetail(id: number | string): Observable<IProm> {
    return this.http.get<IProm>(`${this.urlProm}/${id}`);
  }
  updateProm(promotion: IProm): Observable<IProm> {
    return this.http.put<IProm>(`${this.urlProm}/${promotion.id}`, promotion);
  }
}
