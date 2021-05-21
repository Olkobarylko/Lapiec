import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PromotionsComponent } from './pages/promotions/promotions.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { SaladsComponent } from './pages/salads/salads.component';
import { DessertsComponent } from './pages/desserts/desserts.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPromotionsComponent } from './admin/admin-promotions/admin-promotions.component';

import { PromotionDetailComponent } from './pages/promotion-detail/promotion-detail.component';
import { PizzaDateilComponent } from './pages/pizza-dateil/pizza-dateil.component';

import { BasketComponent } from './pages/basket/basket.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { ProfileGuard } from './shared/guards/profile/profile.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pizza' },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'pizza', component: PizzaComponent },
  { path: 'pizza/:id', component: PizzaDateilComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'promotions/:id', component: PromotionDetailComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: '/admin/category' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'promotions', component: AdminPromotionsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
