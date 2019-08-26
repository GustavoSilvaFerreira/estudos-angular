import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from './../../shared/shared.module';
import { TodoListComponent } from './../todo-list/todo-list.component';
import { AddTodoComponent } from './../add-todo/add-todo.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from './../todo.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Todo } from './../todo.model';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todos: Todo[] = [
    {_id: 1, description: 'tarefa 1', done: false},
    {_id: 2, description: 'tarefa 2', done: true},
    {_id: 3, description: 'tarefa 3', done: false},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent, AddTodoComponent, TodoListComponent ],
      imports: [SharedModule],
      providers: [
        TodoService,
        NotificationService,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
