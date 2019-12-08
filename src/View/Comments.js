import React from 'react';
import './Comments.css';
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

/**
 * View that is shown when the user wants to see the comments of a picture
 * Will eventually take in the following props:
 * - picture: this can be given via url + axios; TBD
 * 
 */

export default class Comments extends React.Component {
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
                            <ArrowBackIcon fontSize="large"/>
                            Return
                    </Button>

                    </Link>
                </div>

                <div className="picture-container">

                </div>

                <div className="comment-container">

                </div>


            </div>

        )
    }
}