import { RouterTestingModule } from '@angular/router/testing';
import { MessageComponent } from './../../shared/message/message.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formLogin: FormGroup;
  let userIncorrect: boolean;
  let mockLoginService;

  beforeEach(async(() => {
    mockLoginService = jasmine.createSpyObj(['isLoggedIn', 'login', 'setUser']);

    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        MessageComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        NotificationService,
        { provide: LoginService, useValue: mockLoginService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockLoginService.isLoggedIn.and.returnValue(false);
    formLogin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    userIncorrect = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login', () => {
    it('should call login', () => {
      spyOn(component, 'login');
      mockLoginService.login.and.returnValue(of(true));
      component.login();
      expect(component.login).toHaveBeenCalled();
    });

    it('should call login and call loginService.login', () => {
      mockLoginService.login.and.returnValue(of(true));
      component.login();
      expect(mockLoginService.login).toHaveBeenCalled();
    });
  });
});
