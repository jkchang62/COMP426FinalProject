import React from 'react';
import Card from '@material-ui/core/Card'
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';
import './MainPage.css'
import { CardMedia, CardHeader, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Components/index';
import firebase from 'firebase';

const MainPageAlpha = () => (
    <MainPageFire />
);

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageurl1: null, imageurl2: null,
            imagetitle1: null, imagetitle2: null,
            imageartist1: null, imageartist2: null,
            imagecomments1: null, imagecomments2: null,
            imageappearances1: null, imageappearances2: null,
            imagevotes1: null, imagevotes2: null,
            imageID1: null, imageID2: null,

        };
        this.render = this.render.bind(this);
        this.handleVote1 = this.handleVote1.bind(this);
        this.handleVote2 = this.handleVote2.bind(this);
        this.handleView1 = this.handleView1.bind(this);
        this.handleView2 = this.handleView2.bind(this);
    }

    handleVote1() {

        let likedImages = [];

        this.props.firebase.state.commentImageURL = this.state.imageurl1;
        this.props.firebase.state.commentImageTitle = this.state.imagetitle1;
        this.props.firebase.state.currentImageComments = this.state.imagecomments1;
        this.props.firebase.state.currentImageID = this.state.imageID1;
        localStorage.setItem('currentImage', this.state.imageID1)

        var db = firebase.firestore();
        var imageRef = db.collection("images");

        imageRef.doc(this.state.imageID1).set({
            timesVoted: this.state.imagevotes1 + 1,
        }, { merge: true });

        imageRef.doc(this.state.imageID1).set({
            timesAppeared: this.state.imageappearances1 + 1,
        }, { merge: true });

        imageRef.doc(this.state.imageID2).set({
            timesAppeared: this.state.imageappearances2 + 1,
        }, { merge: true });

        if (this.props.firebase.autho.currentUser != null) {
            var usersRef = db.collection("users");
            var query = usersRef.where("email", "==", this.props.firebase.autho.currentUser.email);

            query.get().then(function (querySnapshot) {

                querySnapshot.forEach(function(doc) {
                    likedImages = doc.data().likedImages;
                })
                }).then(() => {
                    likedImages.push({
                        'title': this.props.firebase.state.commentImageTitle,
                        'url': this.props.firebase.state.commentImageURL
                    })
                    var usersRef = db.collection("users");
                    usersRef.doc(this.props.firebase.autho.currentUser.uid).set({
                        likedImages : likedImages,
                    },{merge : true});
                    
                });
            }
        }   


    handleVote2() {

        let likedImages = [];

        this.props.firebase.state.commentImageURL = this.state.imageurl2;
        this.props.firebase.state.currentImageComments = this.state.imagecomments2;
        this.props.firebase.state.currentImageID = this.state.imageID2;
        localStorage.setItem('currentImage', this.state.imageID2)


        var db = firebase.firestore();
        var imageRef = db.collection("images");

        imageRef.doc(this.state.imageID2).set({
            timesVoted: this.state.imagevotes2 + 1,
        }, { merge: true })

        imageRef.doc(this.state.imageID1).set({
            timesAppeared: this.state.imageappearances1 + 1,
        }, { merge: true })

        imageRef.doc(this.state.imageID2).set({
            timesAppeared: this.state.imageappearances2 + 1,
        }, { merge: true })

        if (this.props.firebase.autho.currentUser != null) {
            var usersRef = db.collection("users");
            var query = usersRef.where("email", "==", this.props.firebase.autho.currentUser.email);

            query.get().then(function (querySnapshot) {

                querySnapshot.forEach(function(doc) {
                    likedImages = doc.data().likedImages;
                })
                }).then(() => {
                    likedImages.push({
                        'title': this.props.firebase.state.commentImageTitle,
                        'url': this.props.firebase.state.commentImageURL
                    })
                    var usersRef = db.collection("users");
                    usersRef.doc(this.props.firebase.autho.currentUser.uid).set({
                    likedImages : likedImages,
                    },{merge : true});
                    
                });
            }

    }

    handleView1() {
        localStorage.setItem('currentImage', this.state.imageID1)
    }
    handleView2() {
        localStorage.setItem('currentImage', this.state.imageID2)
    }

    handleRefresh() {
        window.location.reload(false);
    }

    componentWillMount() {

        let imageurl = "";
        let title = "";
        let artist = "";
        let comments = [];
        let votes = 0;
        let appearances = 0;
        let imageID = "";

        var db = firebase.firestore();
        var imageRef = db.collection("images");


        let numImages = 50;

        var query1 = imageRef.where("randomIndex", "==", Math.floor(Math.random() * Math.floor(numImages)))

        query1.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                imageID = doc.id;
                imageurl = doc.data().url;
                title = doc.data().title;
                artist = doc.data().artist;
                comments = doc.data().comments;
                votes = doc.data().timesVoted;
                appearances = doc.data().timesAppeared;
            })
        }).then(() => {
            this.setState({
                imageurl1: imageurl,
                imagetitle1: title,
                imageartist1: artist,
                imagecomments1: comments,
                imageappearances1: appearances,
                imagevotes1: votes,
                imageID1: imageID,
            });
        });

        var query2 = imageRef.where("randomIndex", "==", Math.floor(Math.random() * Math.floor(numImages)))

        query2.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                imageID = doc.id;
                imageurl = doc.data().url;
                title = doc.data().title;
                artist = doc.data().artist;
                comments = doc.data().comments;
                votes = doc.data().timesVoted;
                appearances = doc.data().timesAppeared;
            })
        }).then(() => {
            this.setState({
                imageurl2: imageurl,
                imagetitle2: title,
                imageartist2: artist,
                imagecomments2: comments,
                imageappearances2: appearances,
                imagevotes2: votes,
                imageID2: imageID,
            });
        });

    }

    render() {

        return (
            <div>
                <PrimarySearchAppBar />
                <div className="picture-container-one">
                    <CardMedia class="myPics" image={this.state.imageurl1}>
                    </CardMedia>
                </div>

                <div className="refresh-button">
                    <Button variant="contained" color="primary" onClick={this.handleRefresh}>
                            NEW IMAGES
                    </Button>
                </div>
                <div className="vote-button-one">
                    <Link to="/mainpage">
                        <Button variant="contained" color="primary" onClick={this.handleVote1}>
                            VOTE
                    </Button>
                    </Link>
                </div>

                <div className="view-button-one">
                    <Link to="/comments">
                        <Button variant="contained" color="primary" onClick={this.handleView1}>
                            ABOUT
                    </Button>
                    </Link>
                </div>

                <div className="picture-container-two">
                    <CardMedia class="myPics" image={this.state.imageurl2}>
                    </CardMedia>
                </div>

                <div className="vote-button-two">
                    <Link to="/mainpage">
                        <Button variant="contained" color="primary" onClick={this.handleVote2}>
                            VOTE
                    </Button>

                    </Link>
                </div>

                <div className="view-button-two">
                    <Link to="/comments">
                        <Button variant="contained" color="primary" onClick={this.handleView2}>
                            ABOUT
                    </Button>
                    </Link>
                </div>
            </div>
        );
    }


}

const MainPageFire = withFirebase(MainPage);
export default MainPageAlpha;
export { MainPage };