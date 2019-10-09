import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Input() todos: Todo[] = [];
  @Input() loadingAdd = false;
  @Output() emitAdd = new EventEmitter<Todo>();

  todoForm: FormGroup;
  todo: Todo;
  todoExists = false;

  resetTodo() {
    this.todo = {
      _id: 0,
      description: '',
      done: false
    };
  }

  resetForm() {
    this.todoForm.controls.description.reset();
  }

  constructor() {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      description: new FormControl('', {
        validators: [Validators.required]
      })
    });

    // Pesquisar como testar valueChanges
    this.todoForm.controls.description.valueChanges
    .subscribe((t) => {
      this.todoExists = this.todos.filter((todo) => {
        return todo.description === t;
      }).length > 0;
    });

    this.resetTodo();
  }

  formValid() {
    return this.todoForm.valid;
  }

  addTodo() {
    this.todo.description = this.todoForm.value.description;

    this.emitAdd.emit(this.todo);

    this.resetTodo();
    this.resetForm();
  }

}
