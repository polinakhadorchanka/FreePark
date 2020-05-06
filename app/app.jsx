import React from 'react';
import ReactDOM  from 'react-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import reducer from './reducer.jsx';
import StartPage from './components/StartPage.jsx';
import Header from './components/Header.jsx';
import Profile from './components/Profile.jsx';
import EditProfile from "./components/Profile/EditProfile.jsx";

let store = createStore(reducer);
let history = createBrowserHistory();

if(!localStorage.getItem('user')) history.push('/');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/edit-profile" component={EditProfile}/>
                    <Route exact path="/" component={StartPage}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("container")
);
