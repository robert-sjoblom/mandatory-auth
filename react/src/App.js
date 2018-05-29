import React, { Component } from 'react';
import Login from './Login';
import { default as AuthService } from './authService';


class App extends Component {
    state = AuthService.getAuthState();

    componentDidCatch(error, info) {
        console.log(`Component did catch:
        error: ${error},
        info: ${info}`);
    }

    login = (credentials) => {
        AuthService.login(credentials)
            .then(response => {
                this.setState({
                    ...AuthService.getAuthState(),
                    error: undefined
                });
            })
            .catch(err => {
                this.setState({ error: err.error })
            });
    };

    logout = () => {
        AuthService.logout()
            .then(this.setState(AuthService.getAuthState()));
        
    };

    testApi = () => {
        AuthService.getResource('friends')
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => {
                this.setState({ error: err.error })
            });
    }

    // ...

    render() {
        const { error, user } = this.state;
        const userDisplay = (user)
            ? <span>User ID: {user.name}</span>
            : null;
        const loginForm = (!user)
            ? <Login onLogin={this.login} />
            : null;
        // const loginForm = user && <Login onLogin={this.login} />
        return (
            <div className="container">
                {/* {(error) ? <Error error={error} /> : null} */}
                {(error) ? <p className="error">{error}</p> : null}
                {loginForm}
                <div className="status">
                    {userDisplay}
                    <button onClick={this.testApi}>Test API</button>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default App;
