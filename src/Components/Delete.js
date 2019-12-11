import React from 'react';
import {withFirebase} from '../Components/index';
import {Link} from 'react-router-dom';

const DeleteUser1 = ({firebase}) => (
    <Link to='/MainPage'>
    <button type="button" onClick={firebase.DeleteUser}>
        Sign Out
    </button>
    </Link>
);

export default withFirebase(DeleteUser1); 