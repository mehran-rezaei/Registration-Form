import React from 'react';
import { Route , Switch , Redirect } from 'react-router-dom';

// components
import Login from './components/Login'
import SignUp from './components/SignUp';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
                 <Redirect to='signup' />
            </Switch>
        </div>
    );
};
export default App;