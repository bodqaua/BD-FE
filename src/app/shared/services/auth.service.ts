import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICredentials} from 'src/app/shared/models/auth.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private env = environment;

  constructor(
    private http: HttpClient
  ) { }

  public login(credentials: ICredentials): Observable<any>{
    return this.http.post(this.env.API_URL + this.env.AUTH_URL, credentials);
  }
}
