import React from 'react';
import {Link} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import HelpIcon from '@material-ui/icons/Help';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to='/profile'><AccountBoxIcon className='navIcon'/><span>Мой профиль</span></Link></li>
                    <li><Link to='/my-reservation'><AssignmentIcon className='navIcon'/><span>Моя бронь</span></Link></li>
                    <hr/>
                    <li><Link to='/reservation'><DepartureBoardIcon className='navIcon'/><span>Бронирование</span></Link></li>
                    <hr/>
                    <li><Link to='/help'><HelpIcon className='navIcon'/><span>Помощь</span></Link></li>
                </ul>
            </nav>
        );
    }
}