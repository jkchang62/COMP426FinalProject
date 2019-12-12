import { AuthUserContext } from './sessions';
import React from 'react';
import {Link} from 'react-router-dom';

import SignOutEvent from './signOut';


const Navigation = () => (
<div>
<AuthUserContext.Consumer>
{authUser => authUser ? <NavAuth /> : <NavNoAuth /> }
</AuthUserContext.Consumer>
</div>
);

const NavAuth = () => (
    <ul>
        <li>
            <Link to="/DashBoard">Dashboard</Link>
        </li>
        <li>
            <Link to="/MainPage">Home</Link>
        </li>
        <li>
            <Link to="/about">About the Art</Link>
        </li>
        <li>
        <SignOutEvent/>
        </li>
    </ul>
);

const NavNoAuth = () => (
    <ul>
        <li>
            <Link to="/SignIn">Sign In</Link>
        </li>
    </ul>
); 

export default Navigation;