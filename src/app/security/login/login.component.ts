import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  userIncorrect: boolean;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    if(this.loginService.isLoggedIn()) {
      this.router.navigateByUrl('todo-list');
    }

    this.formLogin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.userIncorrect = false;
  }

  login() {
    let user = this.formLogin.controls.user.value;
    this.loginService.login(user, this.formLogin.controls.password.value)
      .subscribe((response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', user);
        this.loginService.setUser(user);
        this.router.navigateByUrl('todo-list');
      }, (error) => {
        this.userIncorrect = true;
      });
  }

}
