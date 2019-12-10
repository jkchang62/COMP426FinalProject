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
            imageurl1 : null, imageurl2 : null,
            imageartist1 : null, imageartist2 : null, 
            imagecomments1 : null, imagecomments2 : null,
            imageappearances1 : null, imageappearances2 : null, 
            imagevotes1 : null, imagevotes2 : null,
            imageID1 : null, imageID2 : null,

        };
        this.render = this.render.bind(this);
        this.handleVote1 = this.handleVote1.bind(this);
        this.handleVote2 = this.handleVote2.bind(this);
        this.counter = 0;
    }

    handleVote1(){

        this.props.firebase.state.commentImageURL = this.state.imageurl1;

        console.log(this.props.firebase.state.commentImageURL)

        var db = firebase.firestore();
        var imageRef = db.collection("images");

        imageRef.doc(this.state.imageID1).set({
            timesVoted : this.state.imagevotes1 + 1,
        }, { merge: true })

        imageRef.doc(this.state.imageID1).set({
            timesAppeared : this.state.imageappearances1 + 1,
        }, { merge: true })

        imageRef.doc(this.state.imageID2).set({
            timesAppeared : this.state.imageappearances2 + 1,
        }, { merge: true })

    }

    handleVote2(){

        this.props.firebase.state.commentImageURL = this.state.imageurl2;

        var db = firebase.firestore();
        var imageRef = db.collection("images");

        imageRef.doc(this.state.imageID2).set({
            timesVoted : this.state.imagevotes2 + 1,
        }, { merge: true })

        imageRef.doc(this.state.imageID1).set({
            timesAppeared : this.state.imageappearances1 + 1,
        }, { merge: true })

        imageRef.doc(this.state.imageID2).set({
            timesAppeared : this.state.imageappearances2 + 1,
        }, { merge: true })

    }


    componentWillMount() {

        let imageurl = "";
        let artist = "";
        let comments = [];
        let votes = 0;
        let appearances = 0;
        let imageID = "";

        var db = firebase.firestore();
        var imageRef = db.collection("images");

        let numImages = 8;

        var query1 = imageRef.where("randomIndex", "==", Math.floor(Math.random() * Math.floor(numImages)))

        query1.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                imageID = doc.id;
                imageurl = doc.data().url;
                artist = doc.data().artist;
                comments = doc.data().comments;
                votes = doc.data().timesVoted;
                appearances = doc.data().timesAppeared;
            })
        }).then(()=>{
                this.setState({
                    imageurl1 : imageurl,
                    imageartist1 : artist,
                    imagecomments1 : comments,
                    imageappearances1 : appearances,
                    imagevotes1 : votes,
                    imageID1 : imageID,
                });
        });

        var query2 = imageRef.where("randomIndex", "==", Math.floor(Math.random() * Math.floor(numImages)))

        query2.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                imageID = doc.id;
                imageurl = doc.data().url;
                artist = doc.data().artist;
                comments = doc.data().comments;
                votes = doc.data().timesVoted;
                appearances = doc.data().timesAppeared;
            })
        }).then(()=>{
                this.setState({
                    imageurl2 : imageurl,
                    imageartist2 : artist,
                    imagecomments2 : comments,
                    imageappearances2 : appearances,
                    imagevotes2 : votes,
                    imageID2 : imageID,
                });
        });
        
    }

    render() {
    
        return (
            <div>
                <PrimarySearchAppBar />
                <div className="picture-container-one">
                    <Card raised id="card-one">
                        <CardHeader title={"Name of the piece: need to add to DB     Artist: " + this.state.imageartist1} />
                        <CardMedia class = "myPics" image = {this.state.imageurl1}>
                        For some reason the images only render if there is a bunch of text in the CardMedia tags but at least we got the images working 🙂    
                        </CardMedia>
                        {"Votes: " + this.state.imagevotes1}
                        {"Winning Percentage: " + (this.state.imagevotes1 / this.state.imageappearances1)*100  + "%"}
                        {"Comments: " + this.state.imagecomments1}
                    </Card>
                </div>

                <div className="vote-button-one">
                    <Link to="/comments">
                        <Button variant="contained" color="primary" onClick = {this.handleVote1}>
                            VOTE
                    </Button>
                    </Link>
                </div>

                <div className="picture-container-two">
                    <Card raised id="card-two">
                    <CardHeader title={"Name of the piece: need to add to DB     Artist: " + this.state.imageartist2} />
                        <CardMedia class = "myPics" image = {this.state.imageurl2}>
                        For some reason the images only render if there is a bunch of text in the CardMedia tags but at least we got the images working 🙂
                        </CardMedia>
                        {"Votes: " + this.state.imagevotes2}
                        {"Winning Percentage: " + (this.state.imagevotes2 / this.state.imageappearances2)*100 + "%"}
                        {"Comments: " + this.state.imagecomments2}
                    </Card>
                </div>

                <div className="vote-button-two">
                    <Link to="/comments">
                        <Button variant="contained" color="primary" onClick = {this.handleVote2}>
                            VOTE
                    </Button>

                    </Link>
                </div>
            </div>
        );
    }

    
}

const MainPageFire = withFirebase(MainPage); 
export default MainPageAlpha; 
export {MainPage};