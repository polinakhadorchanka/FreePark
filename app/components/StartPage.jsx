import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../actions.jsx";

import Info from './StartPage/Info.jsx';
import Login from './StartPage/Login.jsx';
import Registration from './StartPage/Registration.jsx';

// Тут родительский комопонент для стартовой страницы. Слева - меню, Справа - все остальное
class StartPage extends React.Component {
    constructor(props) {
        super(props);

        if(localStorage.getItem('user'))
            props.history.push(`/profile`);
    }

    render() {
        return (
            <main>
                <div className='column'>
                    <Info block='1'/>
                    <Info block='2'/>
                </div>
                <div className='column'>
                    <Login/>
                    <Registration/>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (StartPage));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;