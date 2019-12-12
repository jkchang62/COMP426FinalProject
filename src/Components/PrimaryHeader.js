import React from 'react';
import './PrimaryHeader.css';
import { AuthUserContext } from './sessions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import SignOut from './signOut';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));

const SearchAppBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className = "logo-container">
                      <img src = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Project_M_logo.png' />
                    </div>
                    
                    <div className="navigation-container">
                        <div>
                            <Link to="/DashBoard">Dashboard | </Link>
                            <SignOut />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const DefaultHeader = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <div className = "logo-container">
                    <img src = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Project_M_logo.png' />
                </div>
                <div className = "sign-in-container">
                    <Link to="/SignIn">Sign In</Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default function PrimaryHeader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <SearchAppBar /> : <DefaultHeader />}
            </AuthUserContext.Consumer>
        </div>
    );

}