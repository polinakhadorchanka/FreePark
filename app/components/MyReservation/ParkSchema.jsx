import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions.jsx";

class ParkSchema extends React.Component {
    constructor(props) {
        super(props);

        let placeW = props.store.parkSchema.arrays[0][2],
            ratio = 1 / (placeW / 35);

        this.state = {
            ratio: ratio,
            focus: undefined
        };

        this.setFocusElement = this.setFocusElement.bind(this);
    }

    setFocusElement(num) {
        this.setState({focus: num});
    }

    render() {
        let ratio = this.state.ratio,
            context = this;

        if(this.props.store.parkSchema !== undefined)
            return (
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
                </svg>
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
                <rect style={{fill: '#686868', cursor: 'default'}}
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