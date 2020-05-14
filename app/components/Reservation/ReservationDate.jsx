import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import DateTime from "../Material/DateTime.jsx";
import LoginButton from "../Material/LoginButton.jsx";

class ReservationInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({error: ''});

        let date1 = document.getElementById('date1').value,
            date2 = document.getElementById('date2').value,
            time1 = document.getElementById('time1').value,
            time2 = document.getElementById('time2').value;

        if(Date.parse(date1 + ' ' + time1) && Date.parse(date2 + ' ' + time2)) {
            let context = this;

            //context.props.setParkSchema(data);

            // TODO: Запрос на сервер ПОЛУЧИТЬ СХЕМУ ПАРКОВКИ НА ПЕРИОД ВРЕМЕНИ
            /*
            fetch(`/park?start=${date1 + ' ' + time1}&end=${date2 + ' ' + time2}`)
                .then(response => response.json()).then(async function (data) {
                    context.props.setParkSchema(data);
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
             */
        }
        else {
            this.setState({error: 'Не заполнены дата и/или время'});
        }
    }

    render() {
        return (
            <div className='block' style={{width:'780px', marginRight: '0'}}>
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