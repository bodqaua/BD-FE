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

  private static handleError(httpErrorResponse: HttpErrorResponse): Observable<EmptyError> {
    console.log(httpErrorResponse.error.message);
    alert(httpErrorResponse.error.message || 'Server error');
    return EMPTY;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let credentials: ICredentials = this.auth.getCredentials() || {};
    if (req.body.username) {
      credentials = {};
    }
    const request = req.clone({
        url: `${this.env.API_URL}${req.url}`,
        body: Object.assign({...req.body}, credentials)
      }
    );

    return next.handle(request).pipe(
      catchError(AuthInterceptor.handleError.bind(this))
    );
  }
}
