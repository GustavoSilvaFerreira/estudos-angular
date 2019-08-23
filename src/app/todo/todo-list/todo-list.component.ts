import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('addTodo', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
        style({opacity: 1, transform: 'translateX(0px)', offset: 1}),
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2}),
        style({opacity: 0, transform: 'translateX(30px)', offset: 1}),
      ]))),
    ])
  ]
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[] = [];

  @Output() emitRemove = new EventEmitter<Todo>();
  @Output() emitTaskDone = new EventEmitter<Todo>();

  addTodoState = 'ready';

  constructor() { }

  ngOnInit() {
  }

  totalTodos(done = null) {
    // total de tarefas
    if(done === null) {
      return this.todos.length;
    }

    // total filtrado
    return this.todos.filter((t) => {
      return t.done === done;
    }).length;
  }

  remove(todo: Todo) {
    this.emitRemove.emit(todo);
  }

  taskDone(todo: Todo) {
    this.emitTaskDone.emit(todo);
  }

}
