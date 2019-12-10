import { AuthUserContext } from './sessions';
import React from 'react';
import {Link} from 'react-router-dom';
import signOutEvent from './signOut';

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