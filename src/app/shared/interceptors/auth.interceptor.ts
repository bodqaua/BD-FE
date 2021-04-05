import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, EmptyError, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from 'rxjs/operators';
import {ICredentials} from 'src/app/shared/models/auth.model';
import {AuthService} from 'src/app/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private env = environment;

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials: ICredentials = this.auth.getCredentials() || {};
    const request = req.clone({
        url: `${this.env.API_URL}${req.url}`,
        body: Object.assign({...req.body}, credentials)
      }
    );

    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(httpErrorResponse: HttpErrorResponse): Observable<EmptyError> {
    console.log(httpErrorResponse.error.message);
    return EMPTY;
  }
}
