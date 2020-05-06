import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import Navigation from "../Navigation.jsx";
import LoginField from "../Material/LoginField.jsx";
import LoginButton from "../Material/LoginButton.jsx";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        console.log(props.store.user);

        this.state = {
            email: props.store.user.email,
            name: props.store.user.name,
            surname: props.store.user.surname,
            number: props.store.user.number,
            errors: []
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.errors.length === 0) {
            let context = this,
                obj = {
                    name : e.target.name.value,
                    surname : e.target.surname.value,
                    number : e.target.number.value,
                    email : e.target.email.value
                };


            context.props.history.push('/profile');
            context.props.setUser({id: '11111', name: obj.name, surname: obj.surname,
                number: obj.number, email: obj.email, photo: undefined});

            // TODO: Запрос на сервер ИЗМЕНЕНИЕ ПРОФИЛЯ
            /*
            fetch(`/user?userId=${context.props.store.user.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(response => response.json()).then(function (data) {
                if(data[0].errorCode !== 0) {
                    context.setState({errors : data});
                }
                else {
                    context.props.setUser(data[0].user);
                    context.props.history.push('/profile');
                }
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
            */
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

    render() {
        return (
            <main>
                <div className='column' style={{width: '180px'}}>
                    <Navigation/>
                </div>
                <div className='block' style={{width:'780px', marginRight: '0'}}>
                    <h1 style={{textAlign: 'left'}}>Редактирование профиля</h1>
                    <form id='editProfileForm' name='editProfileForm' onSubmit={this.handleSubmit}>
                        <LoginField label='Ваше имя' id='nameTextField' required={true} name='name'
                                    value={this.state.name}
                                    type='text' handleChange={this.onNameChange}
                                    error={this.state.errors.filter((el) => el.errorCode === 11).length > 0}
                                    helperText={this.state.errors.filter((el) => el.errorCode === 11).length > 0 ?
                                        this.state.errors.filter((el) => el.errorCode === 11)[0].errorMessage
                                        : undefined}/>
                        <LoginField label='Ваша фамилия' id='surnameTextField' required={true} name='surname'
                                    value={this.state.surname}
                                    type='text' handleChange={this.onSurnameChange}
                                    error={this.state.errors.filter((el) => el.errorCode === 12).length > 0}
                                    helperText={this.state.errors.filter((el) => el.errorCode === 12).length > 0 ?
                                        this.state.errors.filter((el) => el.errorCode === 12)[0].errorMessage
                                        : undefined}/>
                        <LoginField label='Номер телефона' id='numberTextField' required={true} name='number'
                                    value={this.state.number}
                                    type='text' handleChange={this.onNumberChange}
                                    error={this.state.errors.filter((el) => el.errorCode === 13 || el.errorCode === 2).length > 0}
                                    helperText={this.state.errors.filter((el) => el.errorCode === 13 || el.errorCode === 2).length > 0 ?
                                        this.state.errors.filter((el) => el.errorCode === 13 || el.errorCode === 2)[0].errorMessage
                                        : undefined}/>
                        <LoginField label='E-mail' id='emailTextField' required={true} name='email'
                                    value={this.state.email}
                                    type='text' handleChange={this.onEmailChange}
                                    error={this.state.errors.filter((el) => el.errorCode === 14 || el.errorCode === 1).length > 0}
                                    helperText={this.state.errors.filter((el) => el.errorCode === 14 || el.errorCode === 1).length > 0 ?
                                        this.state.errors.filter((el) => el.errorCode === 14 || el.errorCode === 1)[0].errorMessage
                                        : undefined}/>
                        <LoginButton label='Сохранить' type='submit'/>
                    </form>
                </div>
            </main>
        );
    }
}


function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (EditProfile));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;