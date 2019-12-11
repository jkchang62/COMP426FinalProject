import React from 'react';
import './Dashboard.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';
import SignOutEvent from '../Components/signOut'
import { withFirebase } from '../Components/index';
import firebase from 'firebase';
import { CardMedia, CardHeader, Button, Card } from '@material-ui/core';

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
            name: null,
            username: null,
            password: null,
            email: null,
            bio: null,
        };
        this.render = this.render.bind(this);
    }

    componentWillMount() {

        let imageurls = [];
        let name = "";
        let username = "";
        let password = "";
        let email = "";
        let bio = "";

        var db = firebase.firestore();
        var usersRef = db.collection("users");
        var imageRef = db.collection("images");

        var query = usersRef.where("email", "==", this.props.firebase.autho.currentUser.email);


        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let htmlBoi = '';
                let temp = doc.data().likedImages;
                for (let i = 0; i < temp.length; i++) {
                    let temp2 = <Card><CardMedia id="myPics" image={temp[i]}> </CardMedia> </Card>
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

    //   componentDidMount() {
    //     this.listener = this.props.firebase.auth.onAuthStateChanged(
    //       authUser => {
    //         authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    //         this.setState({user: this.props.firebase.auth.currentUser.email});
    //       },
    //     );  
    //   }

    //   componentWillUnmount() {
    //     this.listener();
    //   }


    render() {



        console.log(this.state.imageurls);
        return (

            <div className="dashboard-container">

                <PrimarySearchAppBar />

                <div className="bio-container">
                    <div className="profile-picture-container">
                        <AccountCircleIcon fontSize="inherit" />

                    </div>
                    <div className="bio-description-container">
                        <p>Name: {this.state.name}</p>
                        <p>Bio: {this.state.bio}</p>
                        ACCOUNT INFO:
                    <p>Username: {this.state.username}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Password: {this.state.password}</p>

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