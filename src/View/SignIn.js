import React from 'react';
import './SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class SignIn extends React.Component {

    constructor() {
        super();
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    // Add the functionality here
    handleSignUp() {
        console.log("Signing up");
    }

    handleSignIn() {
        console.log("Signing in");
    }

    render() {
        return (
            <div>
                <PrimaryHeader />

                <div className="signin-box">
                    <div className="signin-box-header" />
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justify="space-evenly"
                        spacing={2}
                        direction="column"
                        className="input-grid"
                    >

                        <Grid item className = "avatar-picture">
                            <AccountCircleIcon fontSize = "inherit"/>
                        </Grid>

                        <Grid item>
                            <TextField className="user-input" label="Username" variant="outlined"> </TextField>
                        </Grid>
                        <Grid item>
                            <TextField className="password-input" label="Password" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <Link to="/dashboard">
                                <Button variant="contained" color = "primary"> SignIn </Button>
                            </Link>
                        </Grid>

                        <Link to="/signup">
                            Not registered? Sign Up!
                        </Link>
                    </Grid>

                </div>
            </div>
        );
    }
}