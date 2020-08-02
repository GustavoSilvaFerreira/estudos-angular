import { NotificationService } from './shared/notification.service';
import { HeaderComponent } from './header/header.component';
import { LoginService } from './security/login/login.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { Component } from '@angular/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockLoginService;

  let fixture: ComponentFixture<AppComponent>;

  @Component({
    selector: 'app-header',
    template: '<div></div>'
  })
  class FakeHeaderComponent {}

  @Component({
    selector: 'app-snackbar',
    template: '<div></div>'
  })
  class FakeSnackbarComponent {}

  @Component({
    selector: 'app-footer',
    template: '<div></div>'
  })
  class FakeFooterComponent {}

  beforeEach(async(() => {
    mockLoginService = jasmine.createSpyObj(['setUser']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FakeHeaderComponent,
        FakeSnackbarComponent,
        FakeFooterComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        NotificationService,
        { provide: LoginService, useValue: mockLoginService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    mockLoginService.setUser.and.returnValue('user');
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-list'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('todo-list');
  });

  it(`should call loginService.setUser`, () => {
    mockLoginService.setUser.and.returnValues(of(true));
    fixture.detectChanges();
    expect(mockLoginService.setUser).toHaveBeenCalled();
  });
});
