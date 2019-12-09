import React from 'react';
import './SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
    email: 'hi',
    passwordOne: 'hi',
    error: null,
  };

export default class SignUp extends React.Component {

    constructor() {
        super();
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = { ...INITIAL_STATE};
    }

    // Add the functionality here
    handleSignUp() {
      
        //this.state.email = "";
        //this.state.passwordOne = "";
        console.log(this.state);
        
        
    }

    handleSignIn() {
        console.log("Signing in");
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
      }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;
        
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
                            <TextField value = {this.state.email} onChange = {this.handleInputChange} className="password-input" label="Email" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField value = {this.state.passwordOne}  className="password-input" label="Password" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color = "primary" onClick={this.handleSignUp}> SignUp </Button>
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