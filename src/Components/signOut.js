import React from 'react';
import { withFirebase } from '../Components/index';
import { Link } from 'react-router-dom';
import './SignOut.css';
import { Button } from '@material-ui/core';

const SignOutEvent = ({ firebase }) => (
    <Link to='/MainPage'>
        <Button id = "sign-out-button" type="button" onClick={firebase.SignOutUser}>
            Sign-Out
        </Button>
    </Link>
);

export default withFirebase(SignOutEvent);

