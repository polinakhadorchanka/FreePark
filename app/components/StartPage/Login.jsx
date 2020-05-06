import React from 'react';
import { connect } from 'react-redux';
import actions from "../../actions.jsx";
import { withRouter } from "react-router-dom"

import LoginField from '../Material/LoginField.jsx';
import LoginButton from '../Material/LoginButton.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            errors: []
        };

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onLoginChange(e) {
        let val = e.target.value,
            regexp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
            regexp2 = /^(\+)[0-9]{12}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 1 && el.errorCode !== 2);

        if(regexp.test(val) || regexp2.test(val))
            this.setState({login : val, errors: errors});
        else {
            errors.push({errorCode: 2, errorMessage: 'Формат ввода: xx@mail.ru / +123456789012'});
            this.setState({login : val,
                errors: errors});
        }
    }

    onPasswordChange(e) {
        let val = e.target.value,
            regexp = /^[a-zA-Z0-9-_\.]{6,25}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 1 && el.errorCode !== 3);

        if(regexp.test(val))
            this.setState({password : val, errors: errors});
        else {
            errors.push({errorCode: 3, errorMessage:
                    'Пароль должен быть не короче 6 символов и состоять из букв латинского алфавита и/или цифр'});
            this.setState({password : val,
                errors: errors});
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.errors.length === 0) {
            let context = this,
                obj = {
                    login: e.target.login.value,
                    password: e.target.password.value
                };

            context.props.history.push(`/profile`);
            context.props.setUser({id: '11111', name: 'Полина', surname: 'Ходорченко',
            number: '+375336023681', email: 'polina_98_21@mail.ru', photo: undefined});

            // TODO: Запрос на сервер ЛОГИН
            /*
            fetch(`/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(response => response.json()).then(function (data) {
                if (data[0] && data[0].errorMessage !== null) {
                    context.setState({errors: data});
                }
                else {
                    context.props.setUser(data[0].user);
                    context.props.history.push(`/profile`);
                }
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
            */
        }
    }

    render() {
        return (
            <div className='block' style={{width:'300px', minHeight: '100px'}}>
                <h1>Войти в аккаунт</h1>
                <h4>Пожалуйста, войдите в свой аккаунт</h4><br/>

                <form onSubmit={this.handleSubmit}>
                    <LoginField label='E-mail или телефон' id='loginTextField' required={true} name='login'
                                type='text' handleChange={this.onLoginChange}
                                error={this.state.errors.filter((el) => el.errorCode === 1 ||  el.errorCode === 2).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 1 ||  el.errorCode === 2).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 1 ||  el.errorCode === 2)[0].errorMessage
                                    : undefined}/>
                    <LoginField label='Пароль' id='PasswordTextField' required={true} name='password'
                                type='password' handleChange={this.onPasswordChange}
                                error={this.state.errors.filter((el) => el.errorCode === 1 ||  el.errorCode === 3).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 1 ||  el.errorCode === 3).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 1 ||  el.errorCode === 3)[0].errorMessage
                                    : undefined}/>
                    <LoginButton label='Войти' type='submit'/>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (Login));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;