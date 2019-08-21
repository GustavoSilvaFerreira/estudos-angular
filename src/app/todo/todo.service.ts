import { Todo } from './todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo) {
    const existsTodo = this.todos.filter((t) => {
      return t.description === todo.description;
    });

    if(this.todos.length === 0 || existsTodo.length === 0) {
      this.todos.push(todo);
    }

    this.todos.map((t) => {
      t.id = this.todos.indexOf(t);
      sessionStorage.setItem(t.description, t.done.toString());
    });
  }

  getTodos(done = null) {
    return this.todos.filter((t) => {
      if(done === null) {
        return t;
      }
      return t.done === done;
    });
  }

  remove(todo: Todo) {
    sessionStorage.removeItem(todo.description);
    this.todos = this.todos.filter((t) => {
      return t.id !== todo.id;
    });
  }

  taskDone(todo: Todo) {
    this.todos.map((t) => {
      if(t.id === todo.id) {
        t.done = t.done === false ? true : false;
        sessionStorage.setItem(t.description, t.done.toString());
      }
    });
  }
}
