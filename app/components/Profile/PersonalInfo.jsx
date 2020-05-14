import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import {Link} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.changePhoto = this.changePhoto.bind(this);
    }

    async changePhoto() {
        let f = document.getElementById('file1').files[0];

        if (f) {
            let user = this.props.store.user;
            user.photo = URL.createObjectURL(f);
            await this.props.setUser(user);

            //TODO: Запрос на сервер ИЗМЕНИТЬ ФОТО (по сути инфы о юзере)
            /*
            fetch(`/user?userId=${context.props.store.user.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then(response => response.json()).then(async function (data) {
                if(data[0].errorCode !== 0) {
                    throw 'Не удалось изменить фотографию';
                }
                else await this.props.setUser(user);
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
            */
        }
    }

    render() {
        return (
            <div className='block' style={{width:'780px', marginRight: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1 style={{margin: '0'}}>Мой профиль</h1>
                    <span id='editProfile'><Link to='/edit-profile'>Изменить</Link></span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
                        <div id='userPhoto' style={this.props.store.user.photo ?
                            {backgroundImage : `url('${this.props.store.user.photo}'`,
                            backgroundSize: '120px'} : undefined}>
                            {!this.props.store.user.photo ? <AccountBoxIcon style={{fontSize: '80px'}}/> : undefined}
                        </div>
                    <div className="form-group">
                        <label className="label">
                            <span className="title">Загрузить</span>
                            <input id='file1' type="file"onChange={this.changePhoto}/>
                        </label>
                    </div>
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