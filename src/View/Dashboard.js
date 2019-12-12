import React from 'react';
import './Dashboard.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withFirebase } from '../Components/index';
import firebase from 'firebase';
import { CardMedia, CardHeader, Button, Card, Grid } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import DeleteUser1 from '../Components/Delete';

/**
 * View for the dashboard that will be the primary page of the website. Holds two pictures, a vote and comment button, and 
 * Will hold the following states:
 * - an array of the pictures/url
 * 
 */

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageurls: null,
            imagetitles: null,
            name: null,
            username: null,
            password: null,
            email: null,
            bio: null,
        };
        this.render = this.render.bind(this);
    }

    componentWillMount() {

        window.localStorage.setItem('uid',this.props.firebase.autho.currentUser.uid);

        let imageurls = [];
        let imagetitles = [];
        let name = "";
        let username = "";
        let password = "";
        let email = "";
        let bio = "";

        var db = firebase.firestore();
        var usersRef = db.collection("users");

        var query = usersRef.where("email", "==", this.props.firebase.autho.currentUser.email);


        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let htmlBoi = '';
                let temp = doc.data().likedImages;
                for (let i = 0; i < temp.length; i++) {
                    let temp2 = <Card><CardMedia id="myPics" image={temp[i].url}>{temp[i].title} </CardMedia> </Card>
                    htmlBoi = temp2;
                    imageurls.push(htmlBoi);
                }
                name = doc.data().fullname;
                username = doc.data().username;
                password = doc.data().password;
                email = doc.data().email;
                bio = doc.data().bio;
            })
        }).then(() => {
            this.setState({
                imageurls: imageurls,
                name: name,
                username: username,
                password: password,
                email: email,
                bio: bio,
            });
        });
    }

    render() {

        console.log(this.state.imageurls);
        var db = firebase.firestore();
        var usersRef = db.collection("users");

        return (
            <div className="dashboard-container">
                <div className="bio-container">
                    <div>
                        <AccountCircleIcon id="profpic" fontSize="inherit" />

                    </div>
                
                    <div>
                        <h2>{this.state.name}</h2>
                        <p class="bio">{this.state.bio}</p>
                    
                    <p>Username: {this.state.username}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Password: {this.state.password}</p>
                        <Grid item>
                            <Link to='/update'>
                                <Button class="edit" variant="contained" color="primary" onClick={this.handleEdit}> Edit Profile </Button>
                            </Link>
                        </Grid>

                    </div>

                </div>
                <div className="liked-history-container">
                    <div className="liked-history-title">
                        Like History
                    </div>

                    <div className="liked-pictures">
                        {this.state.imageurls}
                    </div>
                    <div>
                        <p>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(Dashboard);