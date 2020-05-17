import React from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import actions from "../../actions.jsx";

import LoginField from "../Material/LoginField.jsx";
import LoginButton from "../Material/LoginButton.jsx";

// Форма регистрации с методами для проверки корректности
class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirm: '',
            name: '',
            surname: '',
            number: '',
            errors: []
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmChange = this.onConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) { // Отправка формы. Если регистрация удалась, сразу заходим в профиль. Если нет, то ошибочки
        e.preventDefault();

        if(this.state.errors.length === 0) {
            let context = this,
                obj = {
                    name : e.target.name.value,
                    surname : e.target.surname.value,
                    number : e.target.number.value,
                    password : e.target.password.value,
                    email : e.target.email.value
                };

            // TODO: Запрос на сервер РЕГИСТРАЦИЯ
            fetch(`/registration`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(response => response.json()).then(async function (data) {
                if(data[0].errorCode !== 0) {
                    context.setState({errors : data});
                }
                else {
                    await context.props.setUser(data[0].user);
                    context.props.history.push('/profile');
                }
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
        }
    }

    onNameChange(e) {
        let val = e.target.value,
            regexp = /^[a-zA-Zа-яА-Я]{2,25}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 11);

        if(regexp.test(val))
            this.setState({name : val, errors: errors});
        else {
            errors.push({errorCode: 11, errorMessage: 'Имя должно быть длиннее 2х символов и содержать только буквы'});
            this.setState({name : val,
                errors: errors});
        }
    }

    onSurnameChange(e) {
        let val = e.target.value,
            regexp = /^[a-zA-Zа-яА-Я]{2,30}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 12);

        if(regexp.test(val))
            this.setState({surname : val, errors: errors});
        else {
            errors.push({errorCode: 12, errorMessage: 'Фамилия должна быть длиннее 2х символов и содержать только буквы'});
            this.setState({surname : val,
                errors: errors});
        }
    }

    onNumberChange(e) {
        let val = e.target.value,
            regexp = /^(\+)[0-9]{12}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 13 && el.errorCode !== 2);

        if(regexp.test(val))
            this.setState({number : val, errors: errors});
        else {
            errors.push({errorCode: 13, errorMessage: 'Формат: +123456789012'});
            this.setState({number : val,
                errors: errors});
        }
    }

    onEmailChange(e) {
        let val = e.target.value,
            regexp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
            errors = this.state.errors.filter((el) => el.errorCode !== 14 && el.errorCode !== 1);

        if(regexp.test(val))
            this.setState({email : val, errors: errors});
        else {
            errors.push({errorCode: 14, errorMessage: 'Формат ввода: xx@mail.ru'});
            this.setState({email : val,
                errors: errors});
        }
    }

    onPasswordChange(e) {
        let val = e.target.value,
            regexp = /^[a-zA-Zа-яА-Я0-9]{6,25}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 15 && el.errorCode !== 16);

        if(val.length < 6) {
            errors.push({errorCode: 15, errorMessage:
                    'Пароль должен быть не короче 6 символов и состоять из букв и/или цифр'});
            this.setState({password : val,
                errors: errors});
        }
        else if(val !== this.state.confirm) {
            errors.push({errorCode: 16, errorMessage:
                    'Пароли не совпадают'});
            this.setState({password : val,
                errors: errors});
        }
        else if(regexp.test(val))
            this.setState({password : val, errors: errors});
    }

    onConfirmChange(e) {
        let val = e.target.value,
            errors = this.state.errors.filter((el) => el.errorCode !== 16);

        if(val !== this.state.password) {
            errors.push({errorCode: 16, errorMessage:
                    'Пароли не совпадают'});
            this.setState({confirm : val,
                errors: errors});
        }
        else {
            this.setState({confirm : val, errors: errors});
        }
    }

    render() {
        return (
            <div className='block' style={{width:'300px', minHeight: '100px'}}>
                <h1>Впервые на FreePark?</h1>
                <h4>Зарегистрируйтесь</h4><br/>

                <form onSubmit={this.handleSubmit}>
                    <LoginField label='Ваше имя' id='nameTextField' required={true} name='name'
                                type='text' handleChange={this.onNameChange}
                                error={this.state.errors.filter((el) => el.errorCode === 11).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 11).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 11)[0].errorMessage
                                    : undefined}/>
                    <LoginField label='Ваша фамилия' id='surnameTextField' required={true} name='surname'
                                type='text' handleChange={this.onSurnameChange}
                                error={this.state.errors.filter((el) => el.errorCode === 12).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 12).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 12)[0].errorMessage
                                    : undefined}/>
                    <LoginField label='Номер телефона' id='numberTextField' required={true} name='number'
                                type='text' handleChange={this.onNumberChange}
                                error={this.state.errors.filter((el) => el.errorCode === 13 || el.errorCode === 2).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 13 || el.errorCode === 2).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 13 || el.errorCode === 2)[0].errorMessage
                                    : undefined}/>
                    <LoginField label='E-mail' id='emailTextField' required={true} name='email'
                                type='text' handleChange={this.onEmailChange}
                                error={this.state.errors.filter((el) => el.errorCode === 14 || el.errorCode === 1).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 14 || el.errorCode === 1).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 14 || el.errorCode === 1)[0].errorMessage
                                    : undefined}/>
                    <LoginField label='Пароль' id='PasswordTextFieldReg' required={true} name='password'
                                type='password' handleChange={this.onPasswordChange}
                                error={this.state.errors.filter((el) => el.errorCode === 15).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 15).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 15)[0].errorMessage
                                    : undefined}/>
                    <LoginField label='Повторите пароль' id='confirmTextField' required={true} name='confirm'
                                type='password' handleChange={this.onConfirmChange}
                                error={this.state.errors.filter((el) => el.errorCode === 16).length > 0}
                                helperText={this.state.errors.filter((el) => el.errorCode === 16).length > 0 ?
                                    this.state.errors.filter((el) => el.errorCode === 16)[0].errorMessage
                                    : undefined}/>
                    <LoginButton label='Зарегистрироваться' type='submit'/>
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

const Connected = withRouter(connect(mapStateToProps, actions) (Registration));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;