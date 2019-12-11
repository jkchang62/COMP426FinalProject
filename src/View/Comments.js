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
            value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.state.commentArray = this.props.firebase.state.currentImageComments
    }
    /*getComments() {
        // Build an array of items
        let array = [];
        for(let i = 0; i < this.state.commentArray; i++) {
            let string = "User: " + this.state.commentArray[i].user + "\n" + this.this.state.commentArray[i].text
          array.push(
            <Item key={i} item={string} />
          );
        }
      
        // Render it
        return (
          <div>
            {array}
          </div>
        );
      }*/
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        var db = firebase.firestore();
        var image = db.collection("images").doc(this.props.firebase.state.currentImageID)
        var comment = this.state.value
        event.preventDefault();
        
        image.get().then(function(doc) {
            let newcomments = doc.data().comments;
            newcomments.push({
                user: "dan",
                text: comment
            })
            image.update({
                comments: newcomments
            })
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
        //alert('A comment was submitted: ' + this.props.firebase.state.currentImageID);
    }
    render() {
        //console.log(this.state.commentArray)
        const listItems = this.state.commentArray.map((d) => <li key={d.user}>{d.user}</li>)
        return (
            <div>
                <PrimarySearchAppBar />

                <div className="back-button">
                    <Link to="/mainpage">
                        <Button>
                            <ArrowBackIcon fontSize="large" />
                            Return
                    </Button>

                    </Link>
                </div>

                <div className="picture-container">
                <CardMedia class = "myPics" image= {this.props.firebase.state.commentImageURL} >
                </CardMedia>
                </div>

                <div className="comment-container">
                    <ul>
                        {this.state.commentArray.map(d => <li>"{d.text}" -{d.user}</li>)}
                    </ul>
                    <form onSubmit={this.handleSubmit}>
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
