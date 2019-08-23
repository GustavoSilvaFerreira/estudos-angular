import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from './../../app.api';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  constructor(private httpClient: HttpClient) { }

  addTodo(todo: Todo) {
    return this.httpClient.post(`${URL_API}/tasks`, {description: todo.description, done: todo.done});
  }

  getTodos() {
    return this.httpClient.get<Todo[]>(`${URL_API}/tasks`);
  }

  remove(todo: Todo) {
    return this.httpClient.delete(`${URL_API}/tasks/${todo._id}`);
  }

  taskDone(todo: Todo) {
    todo.done = todo.done === false ? true : false;
    return this.httpClient.patch(`${URL_API}/tasks/${todo._id}`, {description: todo.description, done: todo.done});
  }
}
