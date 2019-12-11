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
    }
    render() {

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
                    <CardMedia class="myPics" image={this.props.firebase.state.commentImageURL}>
                    </CardMedia>
                </div>

                <div className="comment-container">

                </div>


            </div>

        )
    }
}

const CommentsFire = withFirebase(Comments);
export default CommentsAlpha;
export { Comments };