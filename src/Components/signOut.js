import React from 'react';
import {withFirebase} from '../Components/index';

const SignOutEvent = ({firebase}) => (
    <button type="button" onClick={firebase.SignOutUser}>
        Sign Out You Scrub
    </button>
);

export default withFirebase(SignOutEvent); 