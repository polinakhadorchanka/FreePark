import React from 'react';
import {Link} from "react-router-dom";
import DriveEtaIcon from '@material-ui/icons/DriveEta';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className='column' style={{width: '650px'}}>
                    <Link className='logoLink' to='/'>
                        <DriveEtaIcon className='logo'/>
                        <span className='title'>FreePark</span>
                    </Link>
                </div>
                <div className='column' style={{width: '360px'}}>

                </div>
            </header>
        );
    }
}