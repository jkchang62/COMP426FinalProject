import React from 'react';
import './SearchPicture.css';
import firebase from 'firebase';
import SearchBar from '../Components/SearchBar';
import { withFirebase } from '../Components/index';

export default class SearchPicture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pictures: <div className = "picture"> <img src = "https://orangemushroom.files.wordpress.com/2017/09/maplestory-256x256.png?w=256" /> </div>,

        }

        this.renderNewPicture = this.renderNewPicture.bind(this);
    }

    renderNewPicture(newPictures) {
        this.setState({
            pictures: newPictures
        })
    }

    render() {
        return (
            <div>
                <div className="search-bar-container">
                    <SearchBar renderNewPicture={this.renderNewPicture} titles={this.state.allImages} />
                </div>
                <div id="search-picture-container">
                    {this.state.pictures}
                </div>
            </div>
        );
    }
}

