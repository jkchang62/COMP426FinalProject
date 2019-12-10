import React from 'react';
import AuthUserContext from './AuthUserContext';
import {withFirebase} from './index'

const HighAuthentication = Component => {
    class highAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = { authUser: null, };
        }

        componentDidMount() {
            console.log('here');
            this.listener = this.props.firebase.autho.onAuthStateChanged(
                authUser => {
                        // ? this.setState({ authUser })
                        // : this.setState({ authUser: null });
                    window.localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.setState({authUser}); 
                    console.log(this.state.authUser);
                },
                () => {
                    window.localStorage.removeItem('authUser');
                    this.setState({authUser: null});
                }
            );
        }
        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>);
        }
    }
    return withFirebase(highAuthentication);
};

export default HighAuthentication;


