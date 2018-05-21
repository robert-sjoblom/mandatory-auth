import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


const jwt_decode = require('jwt-decode');

// ...

interface AuthResponse {
  token: string;
}

interface User {
  sub: string;
  name: string;
}

// ...

@Injectable()
export class AuthService {

  // the decoded token if the user has been authenticated, carrying information about the user.
  _user: User;
  private _userToken;

  // inject the HttpClient service.
  constructor(private http: HttpClient) {
    this._user = JSON.parse(localStorage.getItem('user'));
    this._userToken = JSON.parse(localStorage.getItem('token'));
  }

  // ...
  // The following computed properties may come in handy in the markup in your template...
  get user() {
    return this._user;
  }

  get authenticated() {
    return this._user !== undefined;
  }

  // use this method to catch http errors.
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw({
      error: error.error
    });
  }

  login(credentials): Observable<User> {
    return this.http.post<AuthResponse>('api/auth', credentials)
      .map(data => {
        this._user = jwt_decode(data);
        this._userToken = data;
        localStorage.setItem('user', JSON.stringify(this._user));
        localStorage.setItem('token', JSON.stringify(data));
        return this._user;
      })
      .catch(err => Observable.throw(this.handleError(err)));
  }

  // better to write an object like so: user = { name, token } but whatever
  logout() {
    this._user = null;
    this._userToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getResource(resource): Observable<any> {
    let headers = new HttpHeaders();
    // headers are immutable, so we do this:
    headers = headers.set('Authorization', `${this._userToken}`);
    return this.http.get(`api/${resource}`, { headers });
  }
}
