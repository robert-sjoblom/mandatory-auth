// import axios with the alias 'http'. 
import http from './http';

const jwt_decode = require('jwt-decode');

// ...

class AuthService {

    // the decoded token if the user has been authenticated, carrying information about the user.
    user;

    constructor() {
        // perform any logic upon application startup here...
    }

    // use this method to catch http errors. 
    handleError(error) {
        throw error.response.data;
    }

    // convenience method to get authentication state for a user, which should include the 'user' class property; 
    // this method is used in the <App> component.
    getAuthState() {
        return {
            // ...
        };
    }

    login(credentials) {
        // invoke the relevant API route for authenticating the user with the given credentials and return a Promise
        // that fulfills with authentication state.
        // 
        // Make sure to handle a successful authentication by storing and also decoding the returned token, as well as
        // catching http errors. 
        
        // return ...
    }
    
    logout() {
        // logout the current user by removing the corresponding token. 
    }
    
    getResource(resource) {
        // invoke a protected API route by including the Authorization header and return a Promise that fulfills 
        // with the response body. 
        //
        // If e.g. invoking /api/friends, the 'resource' parameter should equal 'friends'.

        // return ...
    }
}

export default new AuthService();