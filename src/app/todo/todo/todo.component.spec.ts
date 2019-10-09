import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from './../../shared/shared.module';
import { TodoListComponent } from './../todo-list/todo-list.component';
import { AddTodoComponent } from './../add-todo/add-todo.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from './../todo.service';
import { NotificationService } from './../../shared/notification.service';
import { Todo } from './../todo.model';

import { TodoComponent } from './todo.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let httpTestingController: HttpTestingController;
  let mockTodoService;
  let mockNotificationService;

  let todos: Todo[] = [
    {_id: 1, description: 'task 1', done: false},
    {_id: 2, description: 'task 2', done: true},
    {_id: 3, description: 'task 3', done: false},
  ];

  beforeEach(async(() => {
    mockTodoService = jasmine.createSpyObj(['getTodos', 'addTodo', 'remove', 'taskDone']);
    mockNotificationService = jasmine.createSpyObj(['notify']);

    TestBed.configureTestingModule({
      declarations: [ TodoComponent, AddTodoComponent, TodoListComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TodoService, useValue: mockTodoService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    mockTodoService.getTodos.and.returnValue(of(todos));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTodos()', () => {
    it('should call getTodos', () => {
      spyOn(component, 'getTodos');
      component.getTodos();
      expect(component.getTodos).toHaveBeenCalled();
    });

    // it('should define todos in call getTodos', () => {
    //   // mockTodoService.getTodos.and.returnValue(of(todos));
    //   // component.getTodos();

    //   fixture.detectChanges();
    //   expect(component.todos.length).toBe(3);
    // });
  });

  describe('addTodo()', () => {
    it('should call addTodo', () => {
      spyOn(component, 'addTodo');
      mockTodoService.addTodo.and.returnValue(of({ok: true, _id: 4, description: 'task 4', done: false}));
      component.addTodo({_id: 4, description: 'task 4', done: false});
      expect(component.addTodo).toHaveBeenCalledWith({_id: 4, description: 'task 4', done: false});
    });

    it('should add new todo in the todo-list', () => {
      mockTodoService.addTodo.and.returnValue(of({ok: true, _id: 4, description: 'task 4', done: false}));
      component.addTodo({_id: 4, description: 'task 4', done: false});
      expect(component.todos.length).toBe(4);
    });

    it('should call addTodo when emit in child', () => {
      spyOn(component, 'addTodo');
      const addTodoComponent = fixture.debugElement.query(By.directive(AddTodoComponent));
      addTodoComponent.triggerEventHandler('emitAdd', null);

      expect(component.addTodo).toHaveBeenCalled();
    });
  });

  describe('modalRemoverTodo()', () => {
    it('should call modalRemoverTodo', () => {
      spyOn(component, 'modalRemoverTodo');
      component.modalRemoverTodo(todos[0]);
      expect(component.modalRemoverTodo).toHaveBeenCalledWith(todos[0]);
    });

    it('should set todoRemove when call modalRemoverTodo', () => {
      component.modalRemoverTodo(todos[0]);
      expect(component.todoRemover).toBe(todos[0]);
    });
  });

  describe('clearRemove()', () => {
    it('should call clearRemove', () => {
      spyOn(component, 'clearRemove');
      component.clearRemove();
      expect(component.clearRemove).toHaveBeenCalled();
    });

    it('should clear todoRemove when call clearRemove', () => {
      component.todoRemover = todos[0];
      component.clearRemove();
      expect(component.todoRemover).toBeUndefined();
    });
  });

  describe('remove()', () => {
    it('should call remove', () => {
      spyOn(component, 'remove');
      component.remove();
      expect(component.remove).toHaveBeenCalled();
    });

    // it('should remove todo', () => {
    //   mockTodoService.remove.and.returnValue(of({ok: true}));
    //   component.todoRemover = todos[0];
    //   component.remove();
    //   expect(component.todos.length).toBe(2);
    // });
  });

  describe('taskDone()', () => {
    it('should call taskDone', () => {
      spyOn(component, 'taskDone');
      component.taskDone(todos[0]);
      expect(component.taskDone).toHaveBeenCalledWith(todos[0]);
    });
  });
});
