import React from 'react';
import './Dashboard.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PrimarySearchAppBar from '../Components/PrimarySearchAppBar';
import SignOutEvent from '../Components/signOut'
import { withFirebase} from '../Components/index';
/**
 * View for the dashboard that will be the primary page of the website. Holds two pictures, a vote and comment button, and 
 * Will hold the following states:
 * - an array of the pictures/url
 * 
 */

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
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
                <div>
                    <SignOutEvent />
                </div>
                <div className="liked-history-container">
                    <div className="liked-history-title">
                        Like History
                    </div>
                    <div className = "liked-pictures">
                        Insert Pictures Here
                    </div>
                    <div>
                       <p> Naem {this.props.firebase.autho.currentUser.email}
                       {this.props.firebase.autho.currentUser.uid}
                       </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(Dashboard);