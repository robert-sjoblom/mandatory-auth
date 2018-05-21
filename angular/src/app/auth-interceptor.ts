import { HttpErrorResponse, HttpEvent, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';


// ...
// Example of user credentials to match against incoming credentials.
const username  = 'me@domain.com';
const password  = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends   = ['alice', 'bob'];

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.DjwRE2jZhren2Wt37t5hlVru6Myq4AhpGLiiefF69u8';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const {
        body,       // object
        headers,    // object
        method,     // string
        url,        // string
    } = req;
    let response;
    switch (url) {
      case 'api/auth':
        if (body.user === username && body.pass === password) {
          response = makeResponse(token);
        } else {
          response = makeError(401, 'Invalid user credentials');
        }
        break;
      case 'api/friends':
        if (headers.has('Authorization')) {
          response = (headers.get('Authorization') === token)
            ? makeResponse({ friends })
            : makeError(401, 'Unauthorized token');
          } else {
          response = makeError(400, 'No authorization header');
        }
        break;
      default:
        response = makeError(400, 'Unsupported request');
    }

    return response;
    // implement logic for handling API requests, as defined in the exercise instructions.
  }
}
