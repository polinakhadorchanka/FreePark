import React from 'react';
import {Link, withRouter} from "react-router-dom";
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import UserMenu from './UserMenu.jsx';
import {connect} from "react-redux";
import actions from "../actions.jsx";

// Это верхняя часть приложения, тут у нас логотип и все дела
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className='container'>
                    <div className='column'>
                        <Link className='logoLink' to='/'>
                            <DriveEtaIcon className='logo'/>
                            <span className='title'>FreePark</span>
                        </Link>
                    </div>
                    <div className='column'>
                        {this.props.store.user ? <UserMenu/> : undefined}
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (Header));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;