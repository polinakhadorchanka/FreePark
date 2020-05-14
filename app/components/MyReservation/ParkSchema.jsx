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
                <svg width={this.props.store.parkSchema.w*ratio+50} height={this.props.store.parkSchema.h*ratio}>
                    {
                        this.props.store.parkSchema.arrays.map(function (el, index) {
                            return (
                                <ParkingPlace index={index} setFocusElement={context.setFocusElement} key={index}
                                              x={el[0]*ratio+50} y={el[1]*ratio} w={el[2]*ratio} h={el[3]*ratio}/>
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
            <g style={this.props.index < 6 ? {transform: 'rotate(45deg)', margin: '20px',
                    transformOrigin: `${this.props.x+this.props.w/2}px ${this.props.y+this.props.h/2}px 0`} :
                {transform: 'rotate(315deg)',
                    transformOrigin: `${this.props.x+this.props.w/2}px ${this.props.y+this.props.h/2}px 0`}}>
                <rect
                    id={'el'+this.props.index} x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}>
                </rect>
                <text style={{fill: '#C8C8C8'}}
                      x={this.props.index+1 < 10 ? this.props.x+this.props.w*0.45 : this.props.x+this.props.w*0.32}
                      y={this.props.y+this.props.h*0.55}>
                    {this.props.index+1}
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