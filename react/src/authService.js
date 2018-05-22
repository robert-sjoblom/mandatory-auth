// import axios with the alias 'http'. 
import http from './http';

const jwt_decode = require('jwt-decode');

// ...

class AuthService {

    // the decoded token if the user has been authenticated, carrying information about the user.
    user;
    token;

    constructor() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.token = JSON.parse(localStorage.getItem('token'));
    }

    // use this method to catch http errors. 
    handleError(error) {
        throw error.response.data;
    }

    getAuthState() {
        let user;
        let token;
        try {
            user = this.user;
            token = this.token;
        } catch (error) {
            user = null;
            token = null;
        }

        return {
            user,
            token
        };
    }

    login(credentials) {
        return http.post('api/auth', credentials)
            .then(response => {
                // aint pretty.
                this.user = jwt_decode(response.data.token);
                this.token = response.data.token;
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', JSON.stringify(this.token));
                return this.user;
            })
            .catch(err => {
                return this.handleError(err)
            })
    }

    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        return Promise.resolve();
        // logout the current user by removing the corresponding token. 
    }

    getResource(resource) {
        return http({
            method: 'get',
            url: `api/${resource}`,
            headers: { 'Authorization': this.token }
        })
        .then(res => res.data.friends)
        .catch(err => this.handleError(err));
        // or
        // return http.get(`api/${resource}`, { headers: this.token })


        // invoke a protected API route by including the Authorization header and return a Promise that fulfills 
        // with the response body. 
        //
        // If e.g. invoking /api/friends, the 'resource' parameter should equal 'friends'.

        // return ...
    }
}

export default new AuthService();