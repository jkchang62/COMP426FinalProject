import React from 'react';
import {withFirebase} from '../Components/index';
import {Link} from 'react-router-dom';

const SignOutEvent = ({firebase}) => (
    <Link to='/MainPage'>
    <button type="button" onClick={firebase.SignOutUser}>
        Sign Out You Scrub
    </button>
    </Link>
);

export default withFirebase(SignOutEvent); 

