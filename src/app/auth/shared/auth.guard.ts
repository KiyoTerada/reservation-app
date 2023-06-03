import { Injectable } from "@angular/core";
import { AuthService } from '../shared/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor( private authService : AuthService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(this.authService.isAuthenticated()) return true;
    this.router.navigate(['/login'])
    return false
  }
}