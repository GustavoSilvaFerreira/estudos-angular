import { TodoService } from './../todo.service';
import { Todo } from './../todo.model';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService,
              private notificationService: NotificationService) {}

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
          this.notificationService.notify('Tarefa adicionada com sucesso!');
        }
      });
  }

  remove(todo: Todo) {
    this.todoService.remove(todo)
      .subscribe((response: any) => {
        if(response.ok) {
          const index = this.todos.indexOf(todo);
          this.todos.splice(index, 1);
          this.notificationService.notify('Tarefa removida com sucesso!');
        }
      });
  }

  taskDone(todo: Todo) {
    let status = todo.done === false ? 'feita' : 'não feita';
    this.todoService.taskDone(todo)
      .subscribe(() => {
        // loading
        this.notificationService.notify(`Tarefa marcada como ${status}`);
      });
  }
}
