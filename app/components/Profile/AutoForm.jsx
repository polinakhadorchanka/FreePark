import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import LoginField from "../Material/LoginField.jsx";
import LoginButton from "../Material/LoginButton.jsx";

// Компонент с формой для добавления автомобиля
class Autos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mark: '',
            model: '',
            number: '',
            errors: []
        };

        this.onMarkChange = this.onMarkChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onMarkChange(e) { // Проверка марки на корректность ввода
        let val = e.target.value,
            regexp = /^[ a-zA-Zа-яА-Я]{1,20}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 1 && el.errorCode !== 4);

        if(regexp.test(val))
            this.setState({mark : val, errors: errors});
        else {
            errors.push({errorCode: 4, errorMessage: 'Марка может содержать только буквы и должна быть не длиннее 20 символов'});
            this.setState({mark : val, errors: errors});
        }
    }

    onModelChange(e) { // Проверка модели на корректность ввода
        let val = e.target.value,
            regexp = /^[0-9a-zA-Zа-яА-Я ]{1,20}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 2);

        if(regexp.test(val))
            this.setState({mark : val, errors: errors});
        else {
            errors.push({errorCode: 2, errorMessage: 'Модель может содержать только буквы и цифры, а также должна быть не длиннее 20 символов'});
            this.setState({mark : val,
                errors: errors});
        }
    }

    onNumberChange(e) { // Проверка номера на корректность ввода
        let val = e.target.value,
            regexp = /^[0-9a-zA-Zа-яА-Я\- ]{1,10}$/,
            errors = this.state.errors.filter((el) => el.errorCode !== 3);

        if(regexp.test(val))
            this.setState({mark : val, errors: errors});
        else {
            errors.push({errorCode: 3, errorMessage: 'Номер может содержать только буквы и цифры, а также должен быть не длиннее 10 символов'});
            this.setState({mark : val,
                errors: errors});
        }
    }

    async handleSubmit(e) { //Отправка формы на сервер
        e.preventDefault();

        if(this.state.errors.length === 0) {
            // Считываем данные с формы
            let context = this,
                obj = {
                    mark: e.target.mark.value,
                    model: e.target.model.value,
                    number: e.target.number.value,
                };

            // TODO: Запрос на сервер ДОБАВИТЬ АВТО
            fetch(`/autos?userId=${context.props.store.user.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(response => response.json()).then(async function (data) {
                if (data[0] && data[0].errorCode > 0) {
                    context.setState({errors: data});
                }
                else {
                    await context.props.addAuto(context.props.store.autos.concat(data[0].auto));
                    document.autoForm.reset();
                }
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
        }
    }

    render() { // Отрисовка компонента
        return (
            <div className='block' style={{width:'780px', marginRight: '0'}}>
                <h1 style={{margin: '0', textAlign: 'left'}}>Добавить автомобиль</h1>
                <form id='autoForm' name='autoForm' onSubmit={this.handleSubmit}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <LoginField label='Марка' id='mark' required={true} name='mark'
                                    type='text' handleChange={this.onMarkChange}
                                        error={this.state.errors.filter((el) => el.errorCode === 1 || el.errorCode === 4).length > 0}
                                        helperText={this.state.errors.filter((el) => el.errorCode === 1 || el.errorCode === 4).length > 0 ?
                                            this.state.errors.filter((el) => el.errorCode === 1 || el.errorCode === 4)[0].errorMessage
                                            : undefined}
                                        cl='autoForm'/>
                        <LoginField label='Модель' id='model' required={true} name='model'
                                        type='text' handleChange={this.onModelChange}
                                    error={this.state.errors.filter((el) => el.errorCode === 2).length > 0}
                                    helperText={this.state.errors.filter((el) => el.errorCode === 2).length > 0 ?
                                        this.state.errors.filter((el) => el.errorCode === 2)[0].errorMessage
                                        : undefined}
                                    cl='autoForm'/>
                        <LoginField label='Номерной знак' id='number' required={true} name='number'
                                        type='text' handleChange={this.onNumberChange}
                                    error={this.state.errors.filter((el) => el.errorCode === 3).length > 0}
                                    helperText={this.state.errors.filter((el) => el.errorCode === 3).length > 0 ?
                                        this.state.errors.filter((el) => el.errorCode === 3)[0].errorMessage
                                        : undefined}
                                    cl='autoForm'/>
                        <LoginButton label='Добавить' type='submit' cl='autoForm'/>
                    </div>
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

const Connected = withRouter(connect(mapStateToProps, actions) (Autos));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;