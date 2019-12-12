import React from 'react';
import './Comments.css';
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';
import { CardMedia, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Components/index';
import firebase from 'firebase';

/**
 * View that is shown when the user wants to see the comments of a picture
 * Will eventually take in the following props:
 * - picture: this can be given via url + axios; TBD
 * 
 */

const CommentsAlpha = () => (
    <CommentsFire />
);

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentArray: [],
            url: '',
            value: '',
            title: '',
            culture: '',
            dated: '',
            timesAppeared: null,
            timesVoted: null,
            signedIn: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        var db = firebase.firestore();
        var image = db.collection("images").doc(localStorage.getItem('currentImage'))
        var a = this
        image.get().then(function(doc) {
            a.setState({
                commentArray : doc.data().comments,
                url : doc.data().url,
                title : doc.data().title,
                culture : doc.data().culture,
                dated : doc.data().dated,
                timesAppeared : doc.data().timesAppeared,
                timesVoted : doc.data().timesVoted
            })
        })
        this.setState({
            signedIn : this.props.firebase.autho.currentUser != null ? "show" : "hide"
        })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        var db = firebase.firestore();
        var image = db.collection("images").doc(localStorage.getItem('currentImage'))
        var comment = this.state.value
        event.preventDefault();
        
        var a = this
        image.get().then(function(doc) {
            let newcomments = doc.data().comments;
            newcomments.push({
                user: a.props.firebase.autho.currentUser.email,
                text: comment
            })
            image.update({
                comments: newcomments
            })
        }).catch(function (error) {
            console.log("Error getting document:", error);
        })

        var a = this
        db.collection('images').doc(localStorage.getItem('currentImage'))
        .onSnapshot(function(doc) {
            a.setState({
                commentArray : doc.data().comments
            })
        })
    }

    render() {
        return (
            <div>

                <div className="back-button">
                    <Link to="/mainpage">
                        <Button>
                            <ArrowBackIcon fontSize="large" />
                            Return
                    </Button>

                    </Link>
                </div>

                <div className="picture-container">
                    <CardMedia 
                        class = "myPics" 
                        image= {this.state.url} 
                        >
                    </CardMedia>
                </div>

                <div className="stats-container">
                    <h3>Title: {this.state.title}</h3>
                    <p>Dated: {this.state.dated}</p>
                    <p>Culture: {this.state.culture}</p>
                    <p>Times Appeared: {this.state.timesAppeared}</p>
                    <p>Times Voted: {this.state.timesVoted}</p>
                    <p>Win Percentage: {((this.state.timesVoted/this.state.timesAppeared)*100).toFixed(1)}%</p>
                </div>

                <div className="comment-container">
                    <ul class="w3-ul">
                        {this.state.commentArray.map(d => <li>"{d.text}" -{d.user}</li>)}
                    </ul>
                </div>

                <div className="form-container">
                    <form class={this.state.signedIn} onSubmit={this.handleSubmit}>
                        <label>
                            Comment:
                            <input type="text" onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>

        )
    }
}


const CommentsFire = withFirebase(Comments);
export default CommentsAlpha;
export { Comments };
