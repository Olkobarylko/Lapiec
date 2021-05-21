import { Component, OnInit } from '@angular/core';
import { ICat } from 'src/app/shared/interfaces/category/category.intarfaces';
import { IProd } from 'src/app/shared/interfaces/product/product.interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  adminCategories: Array<ICat> = [];
  adminProducts: Array<IProd> = [];
  prodName: string;
  urlName: string;
  describe: string;
  price: number;
  weight: number;
  size: number;
  proteins: number;
  carbohydrates: number;
  jury: number;
  caloric: number;
  imageStatus: boolean;
  image: string;
  category: ICat;
  selectCat: string = 'pizza';
  editStatus: boolean;
  editIndex: number | string;
  uploadPercent: Observable<number>;
  constructor(private catService: CategoryService,
    private prodService: ProductService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAdminCategories();
    this.getProducts();
  }

  private getAdminCategories(): void {
    this.catService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getProducts(): void {
    this.prodService.getProduct().subscribe(
      data => {
        this.adminProducts = data
      },
      error => {
        console.log(error);
      }
    )
  }


  addProd(): void {
    this.category = {
      urlName: this.selectCat
    }
    const Prod: IProd = {
      title: this.prodName,
      describe: this.describe,
      image: this.image,
      price: this.price,
      category: this.category,
      weight: this.weight,
      size: this.size,
      proteins: this.proteins,
      carbohydrates: this.carbohydrates,
      jury: this.jury,
      caloric: this.caloric,
      urlName: this.urlName,
      count: 1
    }
    this.prodService.postProd(Prod).subscribe(
      () => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
    this.imageStatus = false;
    this.resetForm();
  }

  deleteProd(prod: IProd): void {
    this.prodService.deleteProduct(prod.id).subscribe(
      () => {
        this.getProducts();
        this.deleteImage(prod.image);
      }
    )
  }

  editProd(prod: IProd): void {
    this.prodName = prod.title;
    this.describe = prod.describe;
    this.image = prod.image;
    this.price = prod.price;
    this.category = prod.category;
    this.weight = prod.weight;
    this.size = prod.size;
    this.proteins = prod.proteins;
    this.carbohydrates = prod.carbohydrates;
    this.jury = prod.jury;
    this.caloric = prod.caloric;
    this.urlName = prod.urlName;
    this.selectCat = prod.category.urlName;
    this.imageStatus = true;
    this.editStatus = true;
    this.editIndex = prod.id;
  }

  saveProd(): void {
    this.category = {
      urlName: this.selectCat
    }
    const newProd: IProd = {
      title: this.prodName,
      describe: this.describe,
      image: this.image,
      price: this.price,
      category: this.category,
      weight: this.weight,
      size: this.size,
      proteins: this.proteins,
      carbohydrates: this.carbohydrates,
      jury: this.jury,
      caloric: this.caloric,
      urlName: this.urlName,
      count: 1,
      id:this.editIndex
    }
    this.prodService.saveEditProduct(newProd).subscribe(() => {
      this.getProducts();
    },
      error => {
        console.log(error);
      })
    this.editStatus = false;
    this.imageStatus = false;
    this.resetForm();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/products/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.then(image => {
      this.storage.ref(`images/products/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.imageStatus = true;
        this.uploadPercent = null
      });
    });
  }

  deleteImage(image?: string): void {
    image = image || this.image;
    this.storage.refFromURL(image).delete().subscribe(
      () => {
        this.imageStatus = false;
        this.image = '';
      },
      err => {
        console.log(err);
      }
    )
  }



  resetForm(): void {
    this.prodName = '';
    this.describe = '';
    this.image = '';
    this.price = null;
    this.category = null;
    this.weight = null;
    this.size = null;
    this.proteins = null;
    this.carbohydrates = null;
    this.jury = null;
    this.caloric = null;
    this.urlName = "";
    this.selectCat = 'pizza';
  }
}
