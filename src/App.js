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
import {highAuthentication} from './Components/sessions'
import Navigation from './Components/Navigation';


function App() {

    return (
        <div className="App">
          <header className="App-header">
            <Router>
            <Navigation />
            <hr/>
              <Route path={"/mainpage"} component={MainPage} />
              <Route path={"/dashboard"} component={Dashboard} />
              <Route path={"/signup"} component={SignUp} />
              <Route path={"/signin"} component={SignIn} />
              <Route path={"/comments"} component={Comments} />
            </Router>
          </header>
        </div>
    );
  };


export default highAuthentication(App);
