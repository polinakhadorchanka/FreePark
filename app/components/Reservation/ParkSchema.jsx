import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import MySelect from "../Material/MySelect.jsx";
import LoginButton from "../Material/LoginButton.jsx";

class ParkSchema extends React.Component {
    constructor(props) {
        super(props);

        this.setFocusElement = this.setFocusElement.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async handleSubmit(e) {
        e.preventDefault();

        let context = this,
            id = context.props.store.freeAutos.filter((el) =>
                el.mark + ' ' + el.model + ' ' + el.number === document.getElementById('auto').value)[0].id,
            obj = {
                autoId: id,
                start: document.getElementById('start').innerHTML,
                end: document.getElementById('end').innerHTML,
                placeId: context.props.store.focus,
                price: context.props.store.price
            };

        context.props.history.push('/my-reservation');

        // TODO: Запрос на сервер ДОБАВИТЬ АВТО
        /*
        fetch(`/reservation?userId=${context.props.store.user.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(response => response.json()).then(async function (data) {
            await context.props.serReservation(context.props.store.reservation.concat(data));
            context.props.history.push('/my-reservation');
        })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
         */
    }

    async setFocusElement(id) {
        await this.props.setFocus(id);
        document.getElementById('scrollBlock2').scrollIntoView();
    }

    render() {
        let context = this;

        if(this.props.store.parkSchema !== undefined && this.props.store.focus !== undefined)
            return (
                <div>
                    <div id='scrollBlock1' className='block' style={{width:'780px', marginRight: '0', textAlign: 'center'}}>
                        <svg width={this.props.store.parkSchema.width*this.props.store.parkSchema.ratio}
                             height={this.props.store.parkSchema.height*this.props.store.parkSchema.ratio}>
                            {
                                this.props.store.parkSchema.places.map(function (el) {
                                    return (
                                        <ParkingPlace setFocusElement={context.setFocusElement} key={el.number}
                                                      x={el.x*context.props.store.parkSchema.ratio} num={el.number}
                                                      y={el.y*context.props.store.parkSchema.ratio}
                                                      w={el.width*context.props.store.parkSchema.ratio}
                                                      h={el.height*context.props.store.parkSchema.ratio}
                                                      rotate={el.angle} state={el.state} id={el.id}/>
                                    );
                                })
                            }
                        </svg><br/>
                        <svg style={{width: '100%', height: '21px'}}>
                            <rect x='5' y='5' width='15' height='15' style={{fill: '#1A4F55', cursor: 'default'}}>
                            </rect>
                            <text x='25' y='17' style={{fontSize: '12px'}}>
                                Свободное место
                            </text>
                            <rect x='120' y='5' width='15' height='15' style={{fill: '#686868', cursor: 'default'}}>
                            </rect>
                            <text x='140' y='17' style={{fontSize: '12px'}}>
                                Забронированное место
                            </text>
                        </svg>
                    </div>
                    {this.props.store.focus ?
                        <div id='scrollBlock2' className='block' style={{width:'780px', marginRight: '0'}}>
                            <h1 style={{textAlign: 'left'}}>Бронирование</h1>
                            <form onSubmit={this.handleSubmit}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                <div style={{width: '50%'}}>
                                    <span style={{fontWeight: 'bold'}}>Автомобиль: </span>
                                    <MySelect id='auto' values={this.props.store.freeAutos}/>
                                    <span style={{fontWeight: 'bold'}}>Прибытие: </span><span id='start'>{
                                    document.getElementById('date1').value + ' ' +
                                    document.getElementById('time1').value
                                }</span><br/>
                                    <span style={{fontWeight: 'bold'}}>Отъезд: </span><span id='end'>{
                                    document.getElementById('date2').value + ' ' +
                                    document.getElementById('time2').value}</span><br/>
                                    <span style={{fontWeight: 'bold'}}>Место: </span><span id='place'>
                                    {this.props.store.parkSchema.places.filter((el) => el.id === this.props.store.focus)[0].number}
                                    </span><br/><br/>
                                    <span style={{fontWeight: 'bold'}}>Стоимость: </span><span id='price'>
                                    {this.props.store.price} BYR
                                    </span>
                                </div>
                                <div >
                                    <LoginButton type='submit' label='Забронировать'/>
                                </div>
                            </form>
                        </div>
                        : undefined}
                </div>
            );
        else return <div></div>;
    }
}

class ParkingPlace extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <g style={{transform: `rotate(${this.props.rotate}deg)`,
                transformOrigin: `${this.props.x}px ${this.props.y}px 0`}}>
                <rect style={this.props.state == 1 ? {fill: '#686868', cursor: 'default'} : undefined}
                      onClick={this.props.state == 1 ? undefined :
                          () => this.props.setFocusElement(this.props.id)}
                      id={'el'+this.props.index} x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}>
                </rect>
                <text style={{fill: '#C8C8C8', fontSize: '10px'}}
                      x={this.props.index+1 < 10 ? this.props.x+this.props.w*0.4 : this.props.x+this.props.w*0.35}
                      y={this.props.y+this.props.h*0.55}>
                    {this.props.num}
                </text>
            </g>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (ParkSchema));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;