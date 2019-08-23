import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/app.api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: string;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  login(user, password) {
    return this.httpClient.post<string>(`${URL_API}/login`, {
      usuario: user,
      senha: password
    });
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') !== null;
  }

  logout() {
    sessionStorage.clear();
    this.user = undefined;
    this.handleLogin();
  }

  handleLogin() {
    this.router.navigateByUrl('login');
  }
}
