import React from 'react';
import {withFirebase} from '../Components/index';
import '../View/SignIn.css';
import PrimaryHeader from '../Components/PrimaryHeader'
import { Grid, TextField, Button } from '@material-ui/core';
import { Link, withRouter} from 'react-router-dom';
import firebase from 'firebase';

const EditPage = () => (
    <div>
        <h1>Edit Profile</h1>
        <Edit />
    </div>
)


class EditForm extends React.Component {
    constructor(props){
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }
    

    handleEdit() {

        const { email, password, username, bio, fullname } = this.state;

    
                var db = firebase.firestore();
                var userRef = db.collection("users");
    
                userRef.doc(this.props.firebase.autho.currentUser.uid).update({
                    password : password,
                    username: username, 
                    bio : bio,
                    fullname : fullname,
                })
    
                this.props.history.push("/Dashboard");
            }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
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

                        <Grid item>
                            <TextField name="username" onChange={this.onChange} label="Username" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField name="password" onChange={this.onChange} label="Password" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField name="bio" onChange={this.onChange} label="bio" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField name="fullname" onChange={this.onChange} label="fullname" variant="outlined"> </TextField>
                        </Grid>


                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.handleEdit}> Submit </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>
        );
    }
}

const Edit = withRouter(withFirebase(EditForm));
export default EditPage;
export {EditForm};