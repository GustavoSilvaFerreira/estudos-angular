import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) {}

  checkAuthentication(): boolean {
    const loggedin = this.loginService.isLoggedIn();
    if(!loggedin) {
      this.loginService.handleLogin();
    }
    return loggedin;
  }

  canLoad(): boolean {
    return this.checkAuthentication();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication();
  }
}
