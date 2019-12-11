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
        this.state = {
            name: null,
            username: null,
            password: null,
            bio: null,
        };

        this.handleEdit = this.handleEdit.bind(this);
    }
    

    handleEdit() {


        var {  password, username, bio, fullname } = this.state;

        let name1 = "";
        let username1 = "";
        let password1 = "";
        let bio1 = "";

    
                var db = firebase.firestore();
                var userRef = db.collection("users");
                var query = userRef.where("email", "==", this.props.firebase.autho.currentUser.email);

                query.get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        name1 = doc.data().fullname;
                        username1 = doc.data().username;
                        password1 = doc.data().password;
                        bio1 = doc.data().bio;
                    })
                }).then(() => {
                    this.setState({
                        name: name1,
                        username: username1,
                        password: password1,
                        bio: bio1,
                    });
                });

                if(fullname != null){
                    userRef.doc(this.props.firebase.autho.currentUser.uid).set({
                        fullname : fullname,
                    }, { merge: true })
                   
                }
                if(username != null){
                    userRef.doc(this.props.firebase.autho.currentUser.uid).set({
                        username : username,
                    }, { merge: true })
                   
                }
                if(bio != null){
                    userRef.doc(this.props.firebase.autho.currentUser.uid).set({
                        bio : bio,
                    }, { merge: true })
                   
                }
                if(password != null){
                    this.props.firebase.autho.currentUser.updatePassword(password);
                    userRef.doc(this.props.firebase.autho.currentUser.uid).set({
                        password : password,
                    }, { merge: true })
                   
                }

    
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
                            <TextField name="bio" onChange={this.onChange} label="Bio" variant="outlined"> </TextField>
                        </Grid>

                        <Grid item>
                            <TextField name="fullname" onChange={this.onChange} label="Full Name" variant="outlined"> </TextField>
                        </Grid>

                        
                        <Grid item>
                            <TextField name="password" onChange={this.onChange} label="Password" variant="outlined"> </TextField>
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