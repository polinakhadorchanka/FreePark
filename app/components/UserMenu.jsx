import React from 'react';
import {Link, withRouter} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {connect} from "react-redux";
import actions from "../actions.jsx";

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{position : 'relative'}}>
                <div id='userMenu' tabIndex='0'>
                    <span>{this.props.store.user.name}</span>
                    <AccountCircleIcon style={{fontSize: '30px', marginLeft: '10px'}}/>
                    <ArrowDropDownIcon/>
                </div>
                <ul className="sub-menu">
                    <li><Link to='/profile'>Мой профиль</Link></li>
                    <hr/>
                    <li><Link to='/' onClick={() => this.props.setUser(null)}>Выход</Link></li>
                </ul>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (UserMenu));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;