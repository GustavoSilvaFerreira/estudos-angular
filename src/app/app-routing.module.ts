import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedinGuard } from './security/loggedin.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'todo-list', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
                      canActivate: [LoggedinGuard],
                      canLoad: [LoggedinGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
