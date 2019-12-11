import React from 'react';
import './PrimaryHeader.css';
import Navigation from './Navigation';
import { AuthUserContext } from './sessions';
import AppBar from '@material-ui/core/AppBar';
import { fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import SignOut from './signOut';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
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
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className = "navigation-container">
                    <div>
                        <Link to="/DashBoard">Dashboard</Link>
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