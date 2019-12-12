import React from 'react';
import {withFirebase} from '../Components/index';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';

const DeleteUser1 = ({firebase}) => (
    <Link to='/MainPage'>
    <button type="button" onClick={()=>{
        firebase.DeleteUser();
        }}>
        Delete Account
    </button>
    </Link>
);

export default withFirebase(DeleteUser1); 