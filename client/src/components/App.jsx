import React, {Suspense, lazy, useState} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

// Styles importing
import '../css/index.css';

// Header importing
import Nav from './Nav';

import Authenticate from '../components/Authenticate';
import Auth from '../middleware/auth.js'

// Lazy import of both main components
const Home = lazy(() => import('./Pages/Home'));
const Articles = lazy(() => import('./Pages/Articles'));

// Main application component with pagination
class App extends React.Component {

    constructor(props) {
        super(props);

        this.auth = new Auth();
        this.isAutheticated = !!this.auth.data.token,
        this.state = {
            authFormIsOpen: false
        };

        this.handleOpenAuthForm = this.handleOpenAuthForm.bind(this);
    }

    handleOpenAuthForm(open) {
        if (open) {
            this.setState({authFormIsOpen: true});
        } else {
            this.setState({authFormIsOpen: false});
        }
    }



    render() {
        return (
            <Router>
                <Nav 
                    open={this.handleOpenAuthForm}  
                    auth={this.auth}    
                />
                <Authenticate 
                    isOpen={this.state.authFormIsOpen} 
                    open={this.handleOpenAuthForm} 
                    auth={this.auth} 
                />
                <Suspense fallback={<div className="PageLoad">Loading...&#10084;</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/articles" element={<Articles />} />
                    </Routes>
                </Suspense>
            </Router>
        );
    }
};

export default App;
