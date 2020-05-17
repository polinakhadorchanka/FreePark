import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import {Link} from "react-router-dom";

// Компонент с личной информацией
// Просто выводит инфу, полученную от сервера при входе
class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='block' style={{width:'780px', marginRight: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1 style={{margin: '0'}}>Мой профиль</h1>
                    <span id='editProfile'><Link to='/edit-profile'>Изменить</Link></span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
                    <div className='personalInfo'>
                        <span style={{fontWeight: 'bold'}}>Фамилия: </span><span>{this.props.store.user.name}</span><br/>
                        <span style={{fontWeight: 'bold'}}>Имя: </span><span>{this.props.store.user.surname}</span><br/>
                        <span style={{fontWeight: 'bold'}}>E-mail: </span><span>{this.props.store.user.email}</span><br/>
                        <span style={{fontWeight: 'bold'}}>Мобильный телефон: </span><span>{this.props.store.user.number}</span><br/>
                    </div>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (Profile));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;