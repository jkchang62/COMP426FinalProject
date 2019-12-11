  
import React from 'react';
import './App.css';
import Dashboard from './View/Dashboard';
import Comments from './View/Comments';
import SignIn from './View/SignIn';
import SignUp from './View/SignUp';
import MainPage from './View/MainPage';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import {AuthUserContext} from './Components/sessions'
import { withFirebase} from './Components/index';
import Navigation from './Components/Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.autho.onAuthStateChanged(
      authUser => {
        authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }
  render() {

    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <div className="App">
          <header className="App-header">
            <Router>
            <Navigation authUser={this.state.authUser} />
            <hr/>
              <Route path={"/mainpage"} component={MainPage} />
              <Route path={"/dashboard"} component={Dashboard} />
              <Route path={"/signup"} component={SignUp} />
              <Route path={"/signin"} component={SignIn} />
              <Route path={"/comments"} component={Comments} />
            </Router>
          </header>
        </div>
      </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);