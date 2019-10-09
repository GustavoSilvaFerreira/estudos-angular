import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner', () => {
    component.spinnerStatus = true;

    fixture.detectChanges();

    const spiner = fixture.debugElement.queryAll(By.css('#spinner'));
    expect(spiner.length).toBe(1);
  });

  it('should hidden spinner', () => {
    component.spinnerStatus = false;

    fixture.detectChanges();

    const spiner = fixture.debugElement.queryAll(By.css('#spinner'));
    expect(spiner.length).toBe(0);
  });
});
