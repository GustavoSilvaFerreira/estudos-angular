import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private injector: Injector,
              private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if(errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {
        switch(errorResponse.status) {
          case 401:
            if(message === 'Expired token') {
              this.injector.get(LoginService).handleLogin();
            }
            console.log(message);
            break;
          case 403:
            // Não autorizado
            console.log(`${message} || Não autorizado`);
            break;
          case 404:
            // Not found
            console.log(`${message} || Recurso não encontrado`);
            break;
          default:
            // algo deu errado
        }
      });
    }

    super.handleError(errorResponse);
  }
}
