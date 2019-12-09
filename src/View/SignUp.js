import React from 'react';
import './SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class SignUp extends React.Component {

    constructor() {
        super();
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    // Add the functionality here
    handleSignUp() {
        
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

                        <Grid item className = "avatar-picture-signup">
                            <AccountCircleIcon fontSize = "inherit"/>
                        </Grid>

                        <Grid item>
                            <TextField className="password-input" label="Full name" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField className="password-input" label="Email" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField className="user-input" label="Username" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField className="password-input" label="Password" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color = "primary" > SignUp </Button>
                        </Grid>

                        <Link to="/signin">
                            Have an account? Log in!
                        </Link>
                    </Grid>

                </div>
            </div>
        );
    }
}