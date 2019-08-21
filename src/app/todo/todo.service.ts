import { Todo } from './todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo) {
    this.todos.push(todo);

    this.todos.map((t) => {
      t.id = this.todos.indexOf(t);
    });
  }

  getTodos() {
    return this.todos;
  }

  remove(todo: Todo) {
    this.todos = this.todos.filter((t) => {
      return t.id !== todo.id;
    });
  }

  taskDone(todo: Todo) {
    this.todos.map((t) => {
      if(t.id === todo.id) {
        t.done = t.done === false ? true : false;
      }
    });
  }
}
