import React from 'react';
import './Dashboard.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';

/**
 * View for the dashboard that will be the primary page of the website. Holds two pictures, a vote and comment button, and 
 * Will hold the following states:
 * - an array of the pictures/url
 * 
 */

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-container">
                <PrimarySearchAppBar />

                <div className="bio-container">
                    <div className="profile-picture-container">
                        <AccountCircleIcon fontSize="inherit" />
                    </div>
                    <div className="bio-description-container">
                        Some random bio text here.
                    </div>
                </div>

                <div className="liked-history-container">
                    <div className="liked-history-title">
                        Like History
                    </div>
                    <div className = "liked-pictures">
                        Insert Pictures Here
                    </div>
                </div>
            </div>
        );
    }
}