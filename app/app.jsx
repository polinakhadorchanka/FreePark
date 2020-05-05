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

let store = createStore(reducer);
let history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={StartPage}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("container")
);
