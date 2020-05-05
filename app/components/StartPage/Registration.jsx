import React from 'react';
import LoginField from "../Material/LoginField.jsx";
import LoginButton from "../Material/LoginButton.jsx";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='block' style={{width:'300px', minHeight: '100px'}}>
                <h1>Впервые на FreePark?</h1>
                <h4>Зарегистрируйтесь</h4><br/>

                <form>
                    <LoginField label='Ваше имя'/>
                    <LoginField label='Ваша фамилия'/>
                    <LoginField label='Номер телефона'/>
                    <LoginField label='E-mail'/>
                    <LoginField label='Пароль' type='password'/>
                    <LoginField label='Повторите пароль' type='password'/>
                    <LoginButton label='Зарегистрироваться'/>
                </form>
            </div>
        );
    }
}