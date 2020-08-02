import { Todo } from './../todo.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './../../shared/message/message.component';
import { SpinnerComponent } from './../../shared/spinner/spinner.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todos: Todo[] = [];

  beforeEach(async(() => {
    todos = [
      {_id: 1, description: 'task 1', done: false},
      {_id: 2, description: 'task 2', done: true},
      {_id: 3, description: 'task 3', done: false},
    ];

    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        SpinnerComponent,
        MessageComponent
      ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Remove', () => {
    it('should call remove()', () => {
      spyOn(component, 'remove');
      component.remove(todos[0]);
      expect(component.remove).toHaveBeenCalledWith(todos[0]);
    });

    it('should call emitRemove.emit with correct todo in the call remove()', () => {
      // spyOn(component, 'emitRemove');
      component.emitRemove.subscribe((todo) => {
        expect(todo).toEqual(todos[0]);
      });
      component.remove(todos[0]);
    });
  });

  describe('taskDone', () => {
    it('should call taskDone()', () => {
      spyOn(component, 'taskDone');
      component.taskDone(todos[0]);
      expect(component.taskDone).toHaveBeenCalledWith(todos[0]);
    });

    it('should call emitTaskDone.emit with correct todo in the call taskDone()', () => {
      // spyOn(component, 'emitRemove');
      component.emitTaskDone.subscribe((todo) => {
        expect(todo).toEqual(todos[0]);
      });
      component.taskDone(todos[0]);
    });
  });
});
