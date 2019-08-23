import { Component, OnInit } from '@angular/core';
import { LoginService } from './security/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'todo-list';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.setUser(sessionStorage.getItem('user'));
  }
}
