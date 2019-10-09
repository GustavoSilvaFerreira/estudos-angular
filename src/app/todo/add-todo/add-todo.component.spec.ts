import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './../../shared/message/message.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { By } from '@angular/platform-browser';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTodoComponent,
        MessageComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset todo', () => {
    component.todo = {_id: 1, description: 'descrição todo', done: true};
    fixture.detectChanges();

    component.resetTodo();

    expect(component.todo).toEqual({_id: 0, description: '', done: false});
  });

  it('should reset form', () => {
    component.todoForm.value.description = 'description';
    component.resetForm();
    expect(component.todoForm.value.description).toBeNull();
  });

  it('should emit emitAdd with correct todo', () => {
    spyOn(component.emitAdd, 'emit');

    const nameDescription = 'description';

    component.todoForm.value.description = nameDescription;
    component.addTodo();

    expect(component.emitAdd.emit).toHaveBeenCalledWith({_id: 0, description: nameDescription, done: false});
  });

  it('should call resetTodo when addTodo is called', () => {
    spyOn(component, 'resetTodo');
    component.addTodo();
    expect(component.resetTodo).toHaveBeenCalled();
  });

  it('should call resetForm when addTodo is called', () => {
    spyOn(component, 'resetForm');
    component.addTodo();
    expect(component.resetForm).toHaveBeenCalled();
  });

  it('should show span loading', () => {
    component.loadingAdd = true;
    fixture.detectChanges();
    const spanLoading = fixture.debugElement.queryAll(By.css('#spanLoading'));
    expect(spanLoading.length).toBe(1);
  });

  it('should hide span loading', () => {
    component.loadingAdd = false;
    fixture.detectChanges();
    const spanLoading = fixture.debugElement.queryAll(By.css('#spanLoading'));
    expect(spanLoading.length).toBe(0);
  });

  it('should show app-message', () => {
    component.todoExists = true;

    fixture.detectChanges();

    const appMessages = fixture.debugElement.query(By.directive(MessageComponent));
    expect(appMessages.context.hidden).toBe(false);
  });

  it('should hide app-message', () => {
    component.todoExists = false;

    fixture.detectChanges();

    const appMessages = fixture.debugElement.query(By.directive(MessageComponent));
    expect(appMessages.context.hidden).toBe(true);
  });

  it('should active button when form is valid and not exists todo in the todo-list', () => {
    component.todos = [
      {_id: 1, description: 'desc', done: false},
      {_id: 2, description: 'desc1', done: false},
    ];

    const button = fixture.debugElement.query(By.css('button'));
    component.todoForm.get('description').setValue('desc2');
    fixture.detectChanges();
    expect(button.nativeNode.disabled).toBe(false);
  });

  it('should disabled button when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.todoForm.get('description').setValue('');
    fixture.detectChanges();
    expect(button.nativeNode.disabled).toBe(true);
  });

  it('should disabled button when exists todo in the todo-list', () => {
    component.todos = [
      {_id: 1, description: 'desc', done: false},
      {_id: 2, description: 'desc1', done: false},
    ];

    const button = fixture.debugElement.query(By.css('button'));
    component.todoForm.get('description').setValue('desc1');
    fixture.detectChanges();
    expect(button.nativeNode.disabled).toBe(true);
  });

  it('should return true in the call method formValid()', () => {
    component.todoForm.get('description').setValue('desc');
    expect(component.formValid()).toBe(true);
  });

});
