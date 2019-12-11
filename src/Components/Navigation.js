import React from 'react';
import { AuthUserContext } from './sessions';
import { Link } from 'react-router-dom';
import SignOut from './signOut';

/**
 * Moved ALL content to PrimaryHeader.js for more accessibility and ease. 
 * !SHOULD NO LONGER USE!
 */


const linkStyle = {
    color: 'white'
}

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <NavAuth /> : <NavNoAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const NavAuth = () => (
    <div>
        <Link to="/DashBoard" style={linkStyle}>Dashboard</Link>
        <SignOut />
    </div>
);

const NavNoAuth = () => (
    <Link to="/SignIn">Sign In</Link>
);

export default Navigation;