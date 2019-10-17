import { URL_API } from './../../../app.api';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        LoginService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setUser', () => {
    it('should call setUser() with user correct', () => {
      spyOn(service, 'setUser');
      service.setUser('user');
      expect(service.setUser).toHaveBeenCalledWith('user');
    });

    it('should call setUser() and set correct user', () => {
      service.setUser('user');
      expect(service.user).toBe('user');
    });
  });

  describe('getUser', () => {
    it('should call getUser() and return user', () => {
      service.user = 'user';
      expect(service.getUser()).toEqual('user');
    });
  });

  describe('clear', () => {
    it('should call clear()', () => {
      spyOn(service, 'clear');
      service.clear();
      expect(service.clear).toHaveBeenCalled();
    });

    it('should call clear() and call sessionStorage.clear()', () => {
      spyOn(sessionStorage, 'clear');
      service.clear();
      expect(sessionStorage.clear).toHaveBeenCalled();
    });

    it('should call clear() and set user to undefined', () => {
      service.clear();

      expect(service.user).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should call login() with correct url', () => {
      service.login('user', 'password').subscribe((u: any) => {
        expect(u).toEqual({usuario: 'user', senha: 'password'});
      });

      const req = httpTestingController.expectOne(`${URL_API}/login`);
      req.flush({usuario: 'user', senha: 'password'});

      httpTestingController.verify();
    });
  });

  describe('isLoggedIn', () => {
    it('should call isLoggedin() and return sessionStorage', () => {
      sessionStorage.setItem('token', 'user');
      service.isLoggedIn();
      expect(sessionStorage.getItem('token')).toBe('user');
    });
  });

  describe('logout', () => {
    it('should call logout() and call handleLogin()', () => {
      spyOn(service, 'handleLogin');
      service.logout();
      expect(service.handleLogin).toHaveBeenCalled();
    });
  });

  describe('handleLogin', () => {
    it('should call handleLogin() and call clear()', () => {
      spyOn(service, 'clear');
      service.handleLogin();
      expect(service.clear).toHaveBeenCalled();
    });
  });
});
