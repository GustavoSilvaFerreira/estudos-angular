import { NotificationService } from './shared/notification.service';
import { HeaderComponent } from './header/header.component';
import { LoginService } from './security/login/login.service';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

describe('AppComponent', () => {
  let mockLoginService;

  beforeEach(async(() => {
    mockLoginService = jasmine.createSpyObj(['setUser']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        SnackbarComponent,
        FooterComponent
      ],
      providers: [
        NotificationService,
        { provide: LoginService, useValue: mockLoginService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    mockLoginService.setUser.and.returnValue('user');
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-list'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('todo-list');
  });
});
