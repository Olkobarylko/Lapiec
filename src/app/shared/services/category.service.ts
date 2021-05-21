import { HttpClient } from '@angular/common/http';
import { Injectable, InjectableDecorator } from '@angular/core';
import { Observable } from 'rxjs';
import { ICat } from '../interfaces/category/category.intarfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/category';
  }
  getCategories(): Observable<Array<ICat>> {
    return this.http.get<Array<ICat>>(this.url);
  }

  addCategory(newCat: ICat): Observable<ICat> {
    return this.http.post<ICat>(this.url, newCat)
  }

  deleteCategory(id: string | number): Observable<ICat> {
    return this.http.delete<ICat>(`${this.url}/${id}`);
  }
  saveEditCategory(editCategory: ICat): Observable<ICat> {
    return this.http.put<ICat>(`${this.url}/${editCategory.id}`, editCategory);
  }

}

