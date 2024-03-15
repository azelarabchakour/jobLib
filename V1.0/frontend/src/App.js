import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import SignoutButton from './components/SignoutButton';


const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/signup" component={SignupForm} />
                    <Route path="/signin" component={SigninForm} />
                    <Route path="/signout" component={SignoutButton} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
