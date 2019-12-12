import React from 'react';
import './SignOut.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withFirebase } from '../Components/index';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SignOutEvent = ({ firebase }) => (
    <Link to='/MainPage'>
        <Button id = "sign-out-button" type="button" onClick={firebase.SignOutUser}>
            Sign-Out
            <ExitToAppIcon />
        </Button>
    </Link>
);

export default withFirebase(SignOutEvent);

