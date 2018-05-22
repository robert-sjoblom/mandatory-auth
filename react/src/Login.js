import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
        // update the component state with a change to either the username or password.
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.onLogin(this.state);
    }

    render() {
        return (
            <div>
                <form>
                    <input type="text" id="username" name="username" onChange={this.onChange} />
                    <input type="text" id="password" name="password" onChange={this.onChange} />
                    <button onClick={this.onSubmit}>Login</button>
                </form>
            </div>
        );
        // render a login form and perform manual validation.
    }
};

export default Login;