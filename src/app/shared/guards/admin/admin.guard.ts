import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkProfile();
  }
  checkProfile(): boolean {
    if (localStorage.getItem('admin')) {
      const user = JSON.parse(localStorage.getItem('admin'));
      this.auth.checkCurrentUser();
      if (user && user.role === 'ADMIN') {
        return true;
      }
    }
    this.router.navigateByUrl('login');
    return false;
  }
}
