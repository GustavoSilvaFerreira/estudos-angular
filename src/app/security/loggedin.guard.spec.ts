import { LoginService } from './login/login.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedinGuard } from './loggedin.guard';
import { of } from 'rxjs';

describe('LoggedinGuard', () => {
  let mockLoginService;
  let guard: LoggedinGuard;

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj(['isLoggedIn', 'handleLogin']);

    TestBed.configureTestingModule({
      providers: [
        LoggedinGuard,
        { provide: LoginService, useValue: mockLoginService }
      ]
    });

    guard = TestBed.get(LoggedinGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should call checkAuthentication', () => {
    spyOn(guard, 'checkAuthentication');
    mockLoginService.isLoggedIn.and.returnValue(of(true));

    guard.checkAuthentication();
    expect(guard.checkAuthentication).toHaveBeenCalled();
  });

  it('should call checkAuthentication and call loginService.isLoggedIn()', () => {
    guard.checkAuthentication();
    expect(mockLoginService.isLoggedIn).toHaveBeenCalled();
  });

  it('should call checkAuthentication and call loginService.handleLogin()', () => {
    guard.checkAuthentication();
    expect(mockLoginService.handleLogin).toHaveBeenCalled();
  });

  it('should call canLoad', () => {
    spyOn(guard, 'canLoad');
    mockLoginService.isLoggedIn.and.returnValue(of(true));

    guard.canLoad();
    expect(guard.canLoad).toHaveBeenCalled();
  });

  it('should call canLoad and call checkAuthentication', () => {
    spyOn(guard, 'checkAuthentication');
    // mockLoginService.isLoggedIn.and.returnValue(of(true));
    guard.canLoad();
    expect(guard.checkAuthentication).toHaveBeenCalled();
  });

  it('should call canActivate', () => {
    spyOn(guard, 'canActivate');
    mockLoginService.isLoggedIn.and.returnValue(of(true));

    guard.canActivate(null, null);
    expect(guard.canActivate).toHaveBeenCalled();
  });

  it('should call canActivate and call checkAuthentication', () => {
    spyOn(guard, 'checkAuthentication');
    // mockLoginService.isLoggedIn.and.returnValue(of(true));
    guard.canActivate(null, null);
    expect(guard.checkAuthentication).toHaveBeenCalled();
  });

});
