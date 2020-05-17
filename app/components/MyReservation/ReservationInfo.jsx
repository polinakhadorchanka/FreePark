import React from 'react';
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import LoginButton from "../Material/LoginButton.jsx";
import ParkSchema from "./ParkSchema.jsx";
import MyDialog from "../Material/MyDialog.jsx";

// Компонент, отвечающий за список броней пользователя
class ReservationInfo extends React.Component {
    constructor(props) {
        super(props);

        this.getReservation = this.getReservation.bind(this);
        this.removeReservation = this.removeReservation.bind(this);
        this.getParkSchema = this.getParkSchema.bind(this);

        this.getParkSchema();
        this.getReservation();
    }

    getParkSchema() { // Тут мы получаем схему парковки с сервера
        let context = this;

        // TODO: Запрос на сервер ПОЛУЧИТЬ СХЕМУ ПАРКОВКИ
        fetch(`/park?start=2020-01-01 00:00&end=2020-01-01 00:00`)
            .then(response => response.json()).then(async function (data) {
            let placeW = data.places[0].width,
                ratio = 1 / (placeW / 30);

            await context.props.setParkSchema(data, ratio);
        })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
    }

    getReservation() { // Тут получаем список броней пользователя
        let context = this;
        // TODO: Запрос на сервер ПОЛУЧИТЬ СПИСОК БРОНЕЙ
        fetch(`/reservation?userId=${context.props.store.user.id}`)
            .then(response => response.json()).then(async function (data) {
            await context.props.setReservation(data);
        })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
    }

    async removeReservation(e, reservationId) { // Удаление выбранной брони
        let context = this;

        context.props.setReservation(await context.props.store.reservation.filter((el) => el.id !== reservationId));

        // TODO: Запрос на сервер УДАЛЕНИЕ БРОНИ
        fetch(`/reservation?reservationId=${reservationId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json()).then(async function (data) {
                if(data[0].errorCode === 0) {
                    context.props.setReservation(await context.props.store.reservation.filter((el) => el.id !== reservationId));
                }
            })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
    }

    render() { // Отрисовка
        let reservations = this.props.store.reservation,
        context = this;

        return (
            <div>
                {reservations ? reservations.map(function (el, index) {
                    return (<ReservationBlock store={context.props.store}
                                              info={el} key={index} removeReservation={context.removeReservation}/>);
                }) : undefined}
            </div>
        );
    }
}

// Компонент для конкретной брони
class ReservationBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() { // Переключаем состояние "Открыть / закрыть схему"
        this.setState(function (prev) {
            return {open: !prev.open}
        });
    }

    render() { // Отрисовка компонента
        return (
            <div className='block reservationInfo' style={{width:'780px', marginRight: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1 style={{margin: '0'}}>
                        { this.props.info.auto.mark + ' '  +
                        this.props.info.auto.model + ', ' +
                        this.props.info.auto.number }
                    </h1>
                    <MyDialog button={<LoginButton cl='autoForm' label='Отмена'/>}
                              message={'Брони на этот автомобиль будут отменены. Вы не сможете в последующем отменить это действие.'}
                              agree={this.props.removeReservation} id={this.props.info.id}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Прибытие: </span><span>{this.props.info.date1}</span><br/>
                        <span style={{fontWeight: 'bold'}}>Отъезд: </span><span>{this.props.info.date2}</span><br/>
                        <span style={{fontWeight: 'bold'}}>Место: </span>
                        <span>
                            {this.props.store.parkSchema !== undefined ?
                                this.props.store.parkSchema.places.filter((el => el.id === this.props.info.placeId))[0].number
                            : undefined}
                        </span><br/><br/>
                        <span style={{fontWeight: 'bold'}}>Стоимость: </span><span id='price'>
                                    {this.props.info.price} BYR
                                    </span>
                    </div>
                    <div>
                        { this.state.open ? <a href={'#'+`${this.props.info.id}`} onClick={this.toggleOpen}>Закрыть схему проезда &#8593;</a> :
                            <a href={'#'+`${this.props.info.id}`} onClick={this.toggleOpen}>Открыть схему проезда &#8595;</a> }
                    </div>
                </div>
                {this.state.open ?
                    <div className='parkSchema' style={{marginTop: '20px'}}>
                        <ParkSchema store={this.props.store} placeId={this.props.info.placeId}/>
                    </div>
                    : undefined}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = connect(mapStateToProps, actions) (ReservationInfo);

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;