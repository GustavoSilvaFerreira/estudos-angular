import { TodoService } from './../todo.service';
import { Todo } from './../todo.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/security/login/login.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos()
      .subscribe((response) => {
        this.todos = response;
      });
  }

  addTodo(todo) {
    this.todoService.addTodo(todo)
    .subscribe((response: any) => {
        if(response.ok) {
          todo._id = response.insertedId;
          this.todos.push(todo);
        }
      });
  }

  remove(todo: Todo) {
    this.todoService.remove(todo)
      .subscribe((response: any) => {
        if(response.ok) {
          const index = this.todos.indexOf(todo);
          this.todos.splice(index, 1);
        }
      });
  }

  taskDone(todo: Todo) {
    this.todoService.taskDone(todo)
      .subscribe(() => {
        // loading

      });
  }
}
