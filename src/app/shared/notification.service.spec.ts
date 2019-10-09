import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService
      ]
    });

    service = TestBed.get(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call notify', () => {
    spyOn(service, 'notify');
    service.notify('notification');
    expect(service.notify).toHaveBeenCalledWith('notification');
  });

  it('should emit on the call notify', () => {
    spyOn(service.notifier, 'emit');
    service.notify('notification');
    expect(service.notifier.emit).toHaveBeenCalledWith('notification');
  });
});
