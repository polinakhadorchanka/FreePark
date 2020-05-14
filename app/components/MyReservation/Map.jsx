import React from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";

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

    getXY() {
        if(!this.props.store.parkXY) {
            let context = this;

            // TODO: Запрос на сервер ПОЛУЧИТЬ КООРДИНАТЫ ПАРКОВКИ
            /*
            fetch(`/parkXY`)
                .then(response => response.json()).then(function (data) {
                context.props.setParkXY(data.x + ' ' + data.y);
            })
                .catch(function (err) {
                    console.log('EXP: ', err);
                });
             */
        }
    }

    render() {
        let x = this.props.store.parkXY.split(' ')[0],
            y = this.props.store.parkXY.split(' ')[1];

        return (
            <div className='block' style={{width:'780px', marginRight: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <YMaps>
                    <div width='50%'>
                        Описание
                    </div>
                    <Map defaultState={{ center: [x, y], zoom: 15 }} width='50%'>
                        <Placemark defaultGeometry={[x, y]} />
                    </Map>
                </YMaps>
            </div>
        );
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