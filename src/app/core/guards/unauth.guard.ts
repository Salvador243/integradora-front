import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UnauthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('auth.token');
    if (token) {
      return this.router.createUrlTree(['/admin/general']);
    }
    return true;
  }
}
