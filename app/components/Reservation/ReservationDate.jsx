import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import DateTime from "../Material/DateTime.jsx";
import LoginButton from "../Material/LoginButton.jsx";
import {Link} from "react-router-dom";

// Форма для ввода дат для брони
class ReservationInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            freeAutos: undefined,
            minutePrice: undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFreeAutos = this.getFreeAutos.bind(this);
        this.getPlacePrice = this.getPlacePrice.bind(this);
        this.getAutos = this.getAutos.bind(this);

        this.getAutos();
        if(this.minutePrice === undefined) this.getPlacePrice();
    }

    getAutos() { // Получаем список авто (тут нужно, чтобы если их нет, форма блокировалась)
        let context = this;

        // TODO: Запрос на сервер ПОЛУЧИТЬ СПИСОК АВТО
        fetch(`/autos?userId=${this.props.store.user.id}`)
            .then(response => response.json()).then(async function (data) {
            await context.props.addAuto(data)
        })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
    }

    getPlacePrice() { // Получаем цену парквочного места
        let context = this;

        // TODO: Запрос на сервер ПОЛУЧИТЬ ЦЕНУ ПАРКОВОЧНОГО МЕСТА ЗА МИНУТУ
        fetch(`/price`)
            .then(response => response.json()).then(async function (data) {
            await context.setState({minutePrice: data.price});
        })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
    }

    getFreeAutos() { // Тут мы получаем список машин, на которые можно оформить бронь в выбранное время
        let context = this;

        let date1 = document.getElementById('date1').value,
            date2 = document.getElementById('date2').value,
            time1 = document.getElementById('time1').value,
            time2 = document.getElementById('time2').value;

        // TODO: Запрос на сервер ПОЛУЧИТЬ СПИСОК АВТО, на которых нет брони
        fetch(`/autos?userId=${this.props.store.user.id}&free=true&start=${date1 + ' ' + time1}&end=${date2 + ' ' + time2}`)
            .then(response => response.json()).then(async function (data) {
            await context.setState({freeAutos: data});
            await context.props.setFreeAutos(data);

            // Если есть хотя бы одна машина, запрашиваем схему парковки на это время
            if(context.props.store.freeAutos.length > 0) {
                // TODO: Запрос на сервер ПОЛУЧИТЬ СХЕМУ ПАРКОВКИ НА ПЕРИОД ВРЕМЕНИ
                fetch(`/park?start=${date1 + ' ' + time1}&end=${date2 + ' ' + time2}`)
                    .then(response => response.json()).then(async function (data) {
                    let placeW = data.places[0].width,
                        ratio = 1 / (placeW / 30);

                    await context.props.setParkSchema(data, ratio);
                    await context.props.setFocus(data.places.filter((el) => el.state == 0)[0].id);

                    let date1 = Date.parse(document.getElementById('date1').value + ' ' +
                        document.getElementById('time1').value),
                        date2 = Date.parse(document.getElementById('date2').value + ' ' +
                            document.getElementById('time2').value),
                        del = (date2 - date1) / 1000 / 60,
                        price = context.state.minutePrice * del;

                    await context.props.setPrice(price);

                    document.getElementById('scrollBlock1').scrollIntoView();
                })
                    .catch(function (err) {
                        console.log('EXP: ', err);
                    });
            }
            else {
                await context.setState({error: 'На данный промежуток времени нет свободных автомобилей'});
                await context.props.setFocus(undefined);
            }
        })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
    }

    async handleSubmit(e) { // Тут мы обрабатываем выбор дат, проверяем, все ли заполнено корректно
        e.preventDefault();
        this.setState({error: ''});

        let date1 = document.getElementById('date1').value,
            date2 = document.getElementById('date2').value,
            time1 = document.getElementById('time1').value,
            time2 = document.getElementById('time2').value;

        if(Date.parse(date1 + ' ' + time1) && Date.parse(date2 + ' ' + time2) && time1 !== '' && time2 !== '') {
            if(new Date(date1 + ' ' + time1) <= new Date()) {
                await this.setState({error: 'Дата и время прибытия не может быть ранее текущей даты'});
                await this.props.setFocus(undefined);
            }
            else if(new Date(date2 + ' ' + time2) <= new Date(date1 + ' ' + time1)) {
                await this.setState({error: 'Дата и время отъезда не может быть ранее даты и времени прибытия'});
                await this.props.setFocus(undefined);
            }
            else {
                this.getFreeAutos();
            }
        }
        else {
            await this.setState({error: 'Не заполнены дата и/или время'});
            await this.props.setFocus(undefined);
        }
    }

    render() { // Отрисовка компонента
        return (
            <div className='block' style={{width:'780px', marginRight: '0'}}>
                {this.props.store.autos === undefined ? <h4>Загрузка...</h4> :
                    (this.props.store.autos.length === 0 ?
                        <h4>Сначала <Link to={'/profile'}>зарегистрируйте</Link> хотя бы один автомобиль.</h4> :
                        <div>
                            <h1>Выберите желаемую дату и время</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{width: '50%', marginRight: '5px'}}>
                                        <h1 style={{fontWeight: 'normal'}}>Прибытие:</h1>
                                        <DateTime type={'date'} label={'Дата'} id={'date1'}/>
                                        <DateTime type={'time'} label={'Время'} id={'time1'}/>
                                    </div>
                                    <div style={{width: '50%', marginLeft: '5px'}}>
                                        <h1 style={{fontWeight: 'normal'}}>Отъезд:</h1>
                                        <DateTime type={'date'} label={'Дата'} id={'date2'}/>
                                        <DateTime type={'time'} label={'Время'} id={'time2'}/>
                                    </div>
                                </div>
                                <LoginButton type='submit' label='Показать свободне места'/>
                                <h4 style={{margin: '5px 0 0 0', textAlign: 'left'}}>
                                    {this.state.error !== '' ? this.state.error : undefined}
                                </h4>
                            </form>
                        </div>)}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (ReservationInfo));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;