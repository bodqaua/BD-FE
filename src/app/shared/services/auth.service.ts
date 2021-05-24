import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICredentials} from 'src/app/shared/models/auth.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private env = environment;
  private credentialsKey = 'ng_credentials';

  constructor(
    private http: HttpClient
  ) {
  }
  public isLogged(): boolean {
    return !!this.getCredentials();
  }

  public login(credentials: ICredentials): Observable<any> {
    return this.http.post(this.env.AUTH_URL, credentials);
  }

  public getUserName(): string {
    return this.getCredentials().username;
  }

  public logout(): void {
    localStorage.removeItem(this.credentialsKey);
  }

  public saveCredentials(credentials: ICredentials): void {
    localStorage.setItem(this.credentialsKey, JSON.stringify(credentials));
  }

  public getCredentials(): ICredentials | undefined {
    return JSON.parse(localStorage.getItem(this.credentialsKey));
  }

  public createUser(username: string, password: string): Observable<any> {
    return this.http.post(this.env.AUTH_CREATE_USER, {
      new_user_name: username,
      new_user_password: password
    });
  }
}
