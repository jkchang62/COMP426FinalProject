import React from 'react';
import Card from '@material-ui/core/Card'
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';
import './MainPage.css'
import { CardMedia, CardHeader, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class MainPage extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <PrimarySearchAppBar />

                <div className="picture-container-one">
                    <Card raised id="card-one">
                        <CardHeader title="Name of the piece" />
                        <CardMedia>
                            Insert Picture
                        </CardMedia>
                    </Card>
                </div>

                <div className="vote-button-one">
                    <Link to="/comments">
                        <Button variant="contained" color="primary">
                            VOTE
                    </Button>
                    </Link>
                </div>

                <div className="picture-container-two">
                    <Card raised id="card-two">
                        <CardHeader title="Name of the piece" />
                        <CardMedia>

                        </CardMedia>
                    </Card>
                </div>

                <div className="vote-button-two">
                    <Link to="/comments">
                        <Button variant="contained" color="primary">
                            VOTE
                    </Button>

                    </Link>
                </div>
            </div>
        );
    }
}