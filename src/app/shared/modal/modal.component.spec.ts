import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close()', () => {
    spyOn(component, 'close');
    component.close();
    expect(component.close).toHaveBeenCalled();
  });

  it('should call ok()', () => {
    spyOn(component, 'ok');
    component.ok();
    expect(component.ok).toHaveBeenCalled();
  });

  it('should emit on the call close()', () => {
    spyOn(component.emitClose, 'emit');
    component.close();
    expect(component.emitClose.emit).toHaveBeenCalled();
  });

  it('should emit on the call ok()', () => {
    spyOn(component.emitOk, 'emit');
    component.ok();
    expect(component.emitOk.emit).toHaveBeenCalled();
  });

  it('should show id, title and message correct in the html', () => {
    component.id = 'teste1';
    component.title = 'title';
    component.message = 'This message is correct';

    fixture.detectChanges();

    const id = fixture.debugElement.queryAll(By.css('#teste1'));
    const title = fixture.debugElement.query(By.css('#exampleModalLongTitle'));
    const message = fixture.debugElement.query(By.css('#idMessage'));

    expect(id.length).toBe(1);
    expect(title.nativeElement.textContent.trim()).toBe('title');
    expect(message.nativeElement.textContent.trim()).toBe('This message is correct');
  });
});
