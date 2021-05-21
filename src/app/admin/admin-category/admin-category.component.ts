import { Component, OnInit } from '@angular/core';
import { ICat } from 'src/app/shared/interfaces/category/category.intarfaces';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories: Array<ICat> = [];
  nameCat: string;
  nameUrlCat: string;
  editIndex: number | string;
  editStatus: boolean;
  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
    this.getAdminCategories();
  }
  private getAdminCategories() {
    this.catService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  addCategory(): void {
    const Cat: ICat = {
      name: this.nameCat,
      urlName: this.nameUrlCat,
    }
    this.catService.addCategory(Cat).subscribe(
      data => {
        this.getAdminCategories();
      },
      error => {
        console.log(error);
      });
    this.nameCat = '';
    this.nameUrlCat = '';
  }

  deleteCat(cat: ICat): void {
    this.catService.deleteCategory(cat.id).subscribe(
      () => {
        this.getAdminCategories();
      },
      error => {
        console.log(error);
      });
  }

  editCat(cat: ICat): void {
    this.nameCat = cat.name;
    this.nameUrlCat = cat.urlName;
    this.editIndex = cat.id;
    this.editStatus = true;
  }

  saveCat(): void {
    const NewCat: ICat = {
      name: this.nameCat,
      urlName: this.nameUrlCat,
      id: this.editIndex
    }
    this.catService.saveEditCategory(NewCat).subscribe(
      () => {
        this.getAdminCategories();
      },
      error => {
        console.log(error);
      });
    this.nameCat = '';
    this.nameUrlCat = '';
    this.editStatus = false;
  }

}
