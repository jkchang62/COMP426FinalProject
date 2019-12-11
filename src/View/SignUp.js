import React from 'react';
import './SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link, withRouter} from 'react-router-dom';
import firebase from 'firebase';
import { withFirebase } from '../Components/index';

const SignUpPage = () => (
        <SignUpForm />
);
const INITIAL_STATE = {
    email: 'hi',
    passwordOne: 'hi',
    error: null,
};

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = { ...INITIAL_STATE };
    }

    // Add the functionality here
    handleSignUp() {

        const { email, passwordOne ,username} = this.state;

        this.props.firebase
            .CreateUser(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                var db = firebase.firestore();
                var userRef = db.collection("users");
    
                userRef.doc(this.props.firebase.autho.currentUser.uid).set({
                    email : email,
                    password : passwordOne,
                    username: username, 
                    bio : "Add a bio",
                    fullname : "Add your name",
                    likedImages : [],
                })
    
                this.props.history.push("/Dashboard");
            })
            .catch(error=> {
                this.setState({ error }); 
            });
    }

    handleSignIn() {
        console.log("Signing in");
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state);
    }

    render() {
        const {
            email,
            passwordOne,
            username, 
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

                        <Grid item className="avatar-picture-signup">
                            <AccountCircleIcon fontSize="inherit" />
                        </Grid>

                        <Grid item>
                            <TextField name="username" onChange={this.onChange} label="Username" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField name="email" onChange={this.onChange} label="Email" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField name="passwordOne" onChange={this.onChange} label="Password" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.handleSignUp}> SignUp </Button>
                        </Grid>

                        <Link to="/signin">
                            Have an account? Log in!
                        </Link>
                        {error && <p>{error.message}</p>}
                    </Grid>

                </div>
            </div>
        );
    }
}
const SignUpForm = withFirebase(SignUp); 
export default SignUpPage; 
export {SignUp};

