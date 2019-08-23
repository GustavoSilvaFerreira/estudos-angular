import { NotificationService } from './shared/notification.service';
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private injector: Injector,
              private zone: NgZone,
              private notificationService: NotificationService) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if(errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {
        switch(errorResponse.status) {
          case 401:
            if(message === 'Expired token' || message === 'Invalid credentials') {
              this.injector.get(LoginService).handleLogin();
            }
            this.notificationService.notify('faça o login!');
            break;
          case 403:
            // Não autorizado
            this.notificationService.notify('Não autorizado!');
            break;
          case 404:
            // Not found
            this.notificationService.notify('Recurso não encontrado!');
            break;
          case 500:
            // internal erro
            this.notificationService.notify(`Um erro interno ocorreu!`);
            break;
          default:
            // algo deu errado
            this.notificationService.notify('Algo deu errado!');
        }
      });
    }

    super.handleError(errorResponse);
  }
}
