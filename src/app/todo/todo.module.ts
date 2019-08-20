import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {path: '', component: TodoComponent}
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    AddTodoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class TodoModule { }
