import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IProm } from 'src/app/shared/interfaces/promotions/promotions.interfaces';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-promotions',
  templateUrl: './admin-promotions.component.html',
  styleUrls: ['./admin-promotions.component.scss']
})
export class AdminPromotionsComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  promArray: Array<IProm> = [];
  titleName: string;
  layoutName: string;
  image: string;
  imageStatus: boolean;
  PromotionID: string | number;
  editStatus: boolean;
  constructor(private promotionServices: PromotionsService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): void {
    this.promotionServices.getProm().subscribe(
      data => {
        this.promArray = data;
        console.log(this.promArray);

      },
      error => {
        console.log(error);
      }
    );
  }

  addProm(): void {
    const PROM: IProm = {
      title: this.titleName,
      layout: this.layoutName,
      image: this.image,
      isVisible: true,
    }
    this.promotionServices.addProm(PROM).subscribe(
      () => {
        this.getDiscounts();
      },
      error => {
        console.log(error);
      }
    );
    this.titleName = '';
    this.layoutName = '';
    this.imageStatus = false;
  }
  deleteBlog(IProm: IProm): void {

    this.promotionServices.deleteProm(IProm.id).subscribe(
      () => {
        this.getDiscounts();
      },
      error => {
        console.log(error);
      }
    )
    this.deleteImage(IProm.image);

  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/promotions/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.then(image => {
      this.storage.ref(`images/promotions/${image.metadata.name}`).getDownloadURL().subscribe(url => {
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
        // this.toastr.success('Delete image success');
      },
      err => {
        console.log(err);
      }
    )
  }
  editProm(prom: IProm): void {
    this.PromotionID = prom.id;
    this.titleName = prom.title;
    this.layoutName = prom.layout;
    this.image = prom.image;
    this.imageStatus = true;
    this.editStatus = true;
  }
  saveProm(): void {
    const newProm: IProm = {
      id: this.PromotionID,
      title: this.titleName,
      layout: this.layoutName,
      image: this.image,
      isVisible: true,
    }
    this.promotionServices.updateProm(newProm).subscribe(() => {
      this.getDiscounts();
    },
      error => {
        console.log(error);
      })
    this.editStatus = false;
    this.titleName = '';
    this.layoutName = '';
    this.imageStatus = false;
  }

}
