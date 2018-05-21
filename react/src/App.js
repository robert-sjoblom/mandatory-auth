import React, { Component } from 'react';

import AuthService from './authService';
import Login from './Login';

class App extends Component {
    // get the initial state from AuthService. 
    state = AuthService.getAuthState();

    // ...

    login = (username, password) => {
        // login the user with the given credentials and update the component state upon success or failure respectively.
    };

    logout = () => {
        // logout the user and update the component with state given by AuthService.
    };

    testApi() {
        // test access to a protected API route and log the results.
    }

    // ...

    render() {
        // complete the JSX code below to show the proper markup depending on whether or not the user has been authenticated.

        return (
            <div className="container">
            
                <p className="error">Login credentials were incorrect!</p>

                <div className="status">
                    <span>User ID:</span>
                    <button onClick={this.testApi}>Test API</button>
                    <button onClick={this.logout}>Logout</button>
                </div>

                <Login onLogin={this.login} />

            </div>
        );
    }
}

export default App;