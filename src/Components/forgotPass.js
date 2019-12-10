import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';

import {withFirebase} from './index';

const PasswordPage = () => {
    <div>
        <h1>Forgot Password</h1>
        <PasswordForget />
    </div>
}

const INITIAL_STATE = { 
    email: '',
    error: null,
};

class PasswordForgetForm extends react.Component {
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE};
    }
    
    handleSignIn(event) {
        console.log("Signing in");
        const {email, password } = this.state; 
        event.preventDefault();
        this.props.firebase
            .SignInUser(email, password).then( (authUser) => {
            this.setState({ ...INITIAL_STATE}); 
            console.log(authUser);
            this.props.history.push("/MainPage");
            }).catch(error => {
                this.setState({ error }); 
                alert(this.state.error.message);
            });

    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    render() {

        const {
            email,
            error,
        } = this.state; 

        const isInvalid = email === '';

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
                            <TextField name="email" className="user-input" label="Username" onChange={this.onChange} variant="outlined"> </TextField>
                        </Grid>
                        <Grid item>
                            <TextField name="password" className="password-input" label="Password" onChange={this.onChange} variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <Link to="/dashboard">
                                <Button disable={isInvalid} variant="contained" color = "primary" onClick={this.handleSignIn}> SignIn </Button>
                            </Link>
                        </Grid>

                        <Grid item >
                        {error && <p>{error.message}</p>}
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

const SignInForm = withRouter(withFirebase(SignIn));
export default SignInPage;
export {SignInForm};