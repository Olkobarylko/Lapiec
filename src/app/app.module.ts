import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { SaladsComponent } from './pages/salads/salads.component';
import { DessertsComponent } from './pages/desserts/desserts.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPromotionsComponent } from './admin/admin-promotions/admin-promotions.component';
import { PromotionDetailComponent } from './pages/promotion-detail/promotion-detail.component';
import { PizzaDateilComponent } from './pages/pizza-dateil/pizza-dateil.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule  } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { BasketComponent } from './pages/basket/basket.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PromotionsComponent,
    PizzaComponent,
    SaladsComponent,
    DessertsComponent,
    DrinksComponent,
    PaymentComponent,
    FranchiseComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    AdminPromotionsComponent,
    PromotionDetailComponent,
    PizzaDateilComponent,
    BasketComponent,
    ProfileComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
