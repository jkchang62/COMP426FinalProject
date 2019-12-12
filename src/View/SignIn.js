import React from 'react';
import './SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Components/index';

const SignInPage = () => (
    <SignInForm />
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = { ...INITIAL_STATE };
    }

    // Add the functionality here


    handleSignIn(event) {
        console.log("Signing in");
        const { email, password } = this.state;
        event.preventDefault();
        this.props.firebase
            .SignInUser(email, password).then((authUser) => {
                this.setState({ ...INITIAL_STATE });
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
            password,
            error,
        } = this.state;

        const isInvalid = email === '';

        return (    
            <div>
                <div className="title-box-container">

                    <div className="title-container">
                        <Typography align="left" color="inherit" variant="h1" id="title">
                            Project <br /> Modernist
                        </Typography>
                    </div>

                    <div className="three-picture-container">
                        <div className="picture-container1">
                            <img src='http://hdqwalls.com/wallpapers/beautiful-landscape-nature-scenery-1d.jpg' />
                        </div>
                        <div className="picture-container2">
                            <img src='https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg' />
                        </div>
                        <div className="picture-container3">
                            <img src='http://www.brainscape.com/blog/wp-content/uploads/2015/06/Sanzio_01.jpg' />
                        </div>
                    </div>

                </div>
                <div className="signin-box">
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justify="space-evenly"
                        spacing={2}
                        direction="column"
                        className="input-grid"
                    >

                        <Grid item className="avatar-picture">
                            <AccountCircleIcon fontSize="inherit" />
                        </Grid>

                        <Grid item>
                            <TextField name="email" className="user-input" label="Email" onChange={this.onChange} variant="outlined"> </TextField>
                        </Grid>
                        <Grid item>
                            <TextField name="password" className="password-input" label="Password" onChange={this.onChange} variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <Link to="/dashboard">
                                <Button disable={isInvalid} variant="contained" color="primary" onClick={this.handleSignIn}> SignIn </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='/forgot'>
                                <div className="forgot-password-container">
                                    Forgot password?
                                </div>
                            </Link>
                        </Grid>
                        <Grid item>
                        <Link to='/signup/'>
                                <div className="forgot-password-container">
                                    Create account
                                </div>
                            </Link>
                        </Grid>
                        <Grid item >
                            {error && <p>{error.message}</p>}
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
export { SignInForm };