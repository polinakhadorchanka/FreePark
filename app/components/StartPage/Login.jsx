import React from 'react';

import LoginField from '../Material/LoginField.jsx';
import LoginButton from '../Material/LoginButton.jsx';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='block' style={{width:'300px', minHeight: '100px'}}>
                <h1>Войти в аккаунт</h1>
                <h4>Пожалуйста, войдите в свой аккаунт</h4><br/>

                <form>
                    <LoginField label='Телефон или E-mail'/>
                    <LoginField label='Пароль' type='password'/>
                    <LoginButton label='Войти'/>
                </form>
            </div>
        );
    }
}