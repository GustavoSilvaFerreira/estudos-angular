import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoForm: FormGroup;
  todo: Todo;
  todoExists: boolean = false;

  resetTodo() {
    this.todo = {
      id: 0,
      description: '',
      done: false
    };
  }

  resetForm() {
    this.todoForm.controls.description.reset();
  }

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      description: new FormControl('', {
        validators: [Validators.required]
      })
    });

    this.todoForm.controls.description.valueChanges
    .subscribe((t) => {
      this.todoExists = this.todoService.getTodos().filter((todo) => {
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
    this.todoService.addTodo(this.todo);
    this.resetTodo();
    this.resetForm();
  }

}
