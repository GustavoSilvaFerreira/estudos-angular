import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './../security/login/login.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockLoginService;

  beforeEach(async(() => {
    mockLoginService = jasmine.createSpyObj(['logout', 'getUser']);

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    spyOn(component, 'logout');
    mockLoginService.logout.and.returnValue(of(true));

    component.logout();

    expect(component.logout).toHaveBeenCalled();
  });

  it('should call loginService.logout in the call logout()', () => {
    mockLoginService.logout.and.returnValue(of(true));
    component.logout();
    expect(mockLoginService.logout).toHaveBeenCalled();
  });

  it('should call getUser', () => {
    spyOn(component, 'getUser');
    mockLoginService.getUser.and.returnValue('Gustavo');

    component.getUser();

    expect(component.getUser).toHaveBeenCalled();
  });

  it('should call getUser and return user', () => {
    mockLoginService.getUser.and.returnValue('Gustavo');

    expect(component.getUser()).toBe('Gustavo');
  });
});
