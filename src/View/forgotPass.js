import React from 'react';
import {withFirebase} from '../Components/index';
import '../View/SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import { Grid, TextField, Button } from '@material-ui/core';
import { Link, withRouter} from 'react-router-dom';

const PasswordPage = () => (
    <div>
        <h1>Forgot Password</h1>
        <PasswordForget />
    </div>
)

const INITIAL_STATE = { 
    email: '',
    error: null,
};

class PasswordForgetForm extends React.Component {
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE};
        this.handleForgot = this.handleForgot.bind(this);
    }
    
    handleForgot(event) {
        const {email } = this.state; 
        event.preventDefault();
        this.props.firebase.autho
            .sendPasswordResetEmail(email).then( (authUser) => {
            this.setState({ ...INITIAL_STATE}); 
            alert('Password Reset has been set to Your Email');
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
                    <div className="signin-box-header"/>
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justify="space-evenly"
                        spacing={2}
                        direction="column"
                        className="input-grid"
                    >
                        <Grid item>
                            <TextField name="email" className="user-input" label="Email" onChange={this.onChange} variant="outlined"> </TextField>
                        </Grid>
                        <Grid item>
                            <Link to="/dashboard">
                                <Button disable={isInvalid} variant="contained" color = "primary" onClick={this.handleForgot}> Send Request </Button>
                            </Link>
                        </Grid>

                        <Grid item >
                        {error && <p>{error.message}</p>}
                        </Grid>
                    </Grid>

                </div>
            </div>
        );
    }
}

const PasswordForget = withFirebase(PasswordForgetForm);
export default PasswordPage;
export {PasswordForgetForm};