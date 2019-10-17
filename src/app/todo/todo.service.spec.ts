import { Todo } from './todo.model';
import { URL_API } from './../../app.api';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: TodoService;

  let TODOS: Todo[] = [];

  beforeEach(() => {
    TODOS = [
      {_id: 1, description: 'task 1', done: false},
      {_id: 2, description: 'task 2', done: true},
      {_id: 3, description: 'task 3', done: false},
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addTodo', () => {
    it('should call addTodo with correct todo', () => {
      spyOn(service, 'addTodo');
      service.addTodo({_id: 2, description: 'desc', done: false});

      expect(service.addTodo).toHaveBeenCalledWith({_id: 2, description: 'desc', done: false});
    });

    it('should call addTodo with correct url', () => {
      service.addTodo({_id: 2, description: 'desc', done: false}).subscribe();

      const req = httpTestingController.expectOne(`${URL_API}/tasks`);
      req.flush({_id: 2, description: 'desc', done: false});

      httpTestingController.verify();
    });

    it('should call addTodo with correct todo', () => {
      service.addTodo({_id: 2, description: 'desc', done: false}).subscribe((todo) => {
        expect(todo).toEqual({_id: 2, description: 'desc', done: false});
      });

      const req = httpTestingController.expectOne(`${URL_API}/tasks`);
      req.flush({_id: 2, description: 'desc', done: false});

      httpTestingController.verify();
    });
  });

  describe('getTodo', () => {
    it('should call getTodos', () => {
      spyOn(service, 'getTodos');
      service.getTodos();
      expect(service.getTodos).toHaveBeenCalled();
    });

    it('should call getTodos with correct url', () => {
      service.getTodos().subscribe();

      const req = httpTestingController.expectOne(`${URL_API}/tasks`);
      req.flush(TODOS);

      httpTestingController.verify();
    });

    it('should call getTodos and return todos', () => {
      service.getTodos().subscribe((todos) => {
        expect(todos.length).toBe(3);
      });

      const req = httpTestingController.expectOne(`${URL_API}/tasks`);
      req.flush(TODOS);

      httpTestingController.verify();
    });
  });

  describe('remove', () => {
    it('should call remove() with correct todo', () => {
      spyOn(service, 'remove');
      service.remove(TODOS[0]);
      expect(service.remove).toHaveBeenCalledWith(TODOS[0]);
    });

    it('should call remove with correct url', () => {
      service.remove(TODOS[0]).subscribe();
      const req = httpTestingController.expectOne(`${URL_API}/tasks/${TODOS[0]._id}`);
      req.flush(TODOS[0]);
      httpTestingController.verify();
    });
  });

  describe('taskDone', () => {
    it('should call taskDone() with correct todo', () => {
      spyOn(service, 'taskDone');
      service.taskDone(TODOS[0]);
      expect(service.taskDone).toHaveBeenCalledWith(TODOS[0]);
    });

    it('should call taskDone with correct url', () => {
      service.taskDone(TODOS[0]).subscribe();
      httpTestingController.expectOne(`${URL_API}/tasks/${TODOS[0]._id}`);

      httpTestingController.verify();
    });
  });
});
