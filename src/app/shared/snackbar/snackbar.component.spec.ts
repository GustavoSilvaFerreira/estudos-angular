import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from './../notification.service';

import { SnackbarComponent } from './snackbar.component';
import { By } from '@angular/platform-browser';
import { tap, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarComponent ],
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        NotificationService
      ]
    })
    .compileComponents();

    notificationService = TestBed.get(NotificationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message in the html', () => {
    component.message = 'This is correct message';

    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('div'));
    expect(div.nativeElement.textContent.trim()).toBe('This is correct message');
  });

  it('should show the correct message', () => {
    notificationService.notifier
      .subscribe((message) => {
        expect(message).toBe('notification');
      });

    notificationService.notify('notification');
  });
});
