import React from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";

// Блок с отображением Яндекс-карты
class MyMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: undefined,
            y: undefined
        };

        this.getXY = this.getXY.bind(this);
        this.getXY();
    }

    getXY() { // Получаем координаты парковки с сервера
        if(!this.props.store.parkXY) {
            let context = this;

            fetch(`/parkXY`)
                .then(response => response.json()).then(function (data) {
                context.props.setParkXY(data.x + ' ' + data.y);
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
        }
    }

    render() { // Отрисовываем компонент
        if(this.props.store.parkXY !== undefined) {
            let x = this.props.store.parkXY.split(' ')[0],
                y = this.props.store.parkXY.split(' ')[1];

            return (
                <div className='block' style={{
                    width: '780px',
                    marginRight: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <YMaps>
                        <Map defaultState={{center: [x, y], zoom: 15}} width='100%'>
                            <Placemark defaultGeometry={[x, y]}/>
                        </Map>
                    </YMaps>
                </div>
            );
        }
        else return <div></div>;
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = withRouter(connect(mapStateToProps, actions) (MyMap));

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;