import React from "react";

import { request } from '../../middleware/http.js';

class Authenticate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signInForm: {
                email: '',
                password: ''
            },

            signUpForm: {
                name: '',
                email: '',
                password: ''
            }  
        };

        // Composing Auth object
        this.auth = this.props.auth;
    }



    handleChangeAuth(event, formName) {
        this.setState({
            [formName]: {
                ...this.state[formName],
                [event.target.name]: event.target.value
            }
        });
    }
    
    handleCleanUpAuth(formName) {
        if (formName === 'signUpForm') {
            this.setState(prevState => ({
                [formName]: {
                    ...prevState[formName], 
                    name: '',
                    email: '',
                    password: ''
                }
            }));
        } else {
            this.setState(prevState => ({
                [formName]: {
                    ...prevState[formName], 
                    email: '',
                    password: ''
                }
            }));
        }
    }

    handleSignUp(e, formName) {
        e.preventDefault();

        request(
            '/api/auth/signUp', 
            'POST', 
            {...this.state.signUpForm}
        )
            .then(data => console.log(data.message))
            .catch(error => console.log(error.message));

        this.handleCleanUpAuth(formName);
    }

    handleSignIn(e, formName) {
        e.preventDefault();

        request(
            '/api/auth/signIn', 
            'POST', 
            {...this.state.signInForm}
        )
            .then(data => {
                this.auth.signIn(data.token, data.userId);
            })
            .catch(error => console.log(error.message));

        this.handleCleanUpAuth(formName);
    }

    render() {
        return (
            <div 
                className={`Auth ${this.props.isOpen ? 'Active' : ''}`}
                onClick={() => this.props.open(false)}
            >
                <div className="Auth__Block" onClick={e => e.stopPropagation()}>  	
                    <input type="checkbox" id="authCheck" aria-hidden="true" />

                    <div className="Auth__SignUp">
                        <form onSubmit={e => this.handleSignUp(e, 'signUpForm')}>
                            <label 
                                className="Auth__Label"
                                htmlFor="authCheck" 
                                aria-hidden="true"
                            >
                                Sign up
                            </label>
                            <input 
                                className="Auth__Field"
                                type="text" 
                                name="name" 
                                placeholder="User name" 
                                required 
                                value={this.state.signUpForm.name}
                                onChange={e => this.handleChangeAuth(e, 'signUpForm')}
                            />
                            <input 
                                className="Auth__Field"
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                required 
                                value={this.state.signUpForm.email}
                                onChange={e => this.handleChangeAuth(e, 'signUpForm')}
                            />
                            <input 
                                className="Auth__Field"
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                required 
                                value={this.state.signUpForm.password}
                                onChange={e => this.handleChangeAuth(e, 'signUpForm')}
                            />
                            <button className="Auth__Btn">Sign up</button>
                        </form>
                    </div>

                    <div className="Auth__SignIn">
                        <form onSubmit={e => this.handleSignIn(e, 'signInForm')}>
                            <label 
                                className="Auth__Label"
                                htmlFor="authCheck" 
                                aria-hidden="true"
                            >
                                Sign in
                            </label>
                            <input 
                                className="Auth__Field"
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                required 
                                value={this.state.signInForm.email}
                                onChange={e => this.handleChangeAuth(e, 'signInForm')}
                            />
                            <input 
                                className="Auth__Field"
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                required 
                                value={this.state.signInForm.password}
                                onChange={e => this.handleChangeAuth(e, 'signInForm')}
                            />
                            <button className="Auth__Btn">Sing in</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Authenticate;
