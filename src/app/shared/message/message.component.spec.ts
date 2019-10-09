import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { By } from '@angular/platform-browser';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct message in div', () => {
    component.message = 'This message is correct';
    component.hidden = false;
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('div'));

    expect(div.nativeElement.textContent.trim()).toBe('This message is correct');
  });

  it('should show div', () => {
    component.message = 'This message is correct';
    component.hidden = false;
    fixture.detectChanges();

    const div = fixture.debugElement.queryAll(By.css('div'));

    expect(div.length).toBe(1);
  });

  it('should hidden div', () => {
    component.message = 'This message is correct';
    component.hidden = true;
    fixture.detectChanges();

    const div = fixture.debugElement.queryAll(By.css('div'));

    expect(div.length).toBe(0);
  });
});
