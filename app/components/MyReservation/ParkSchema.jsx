import React from 'react';

// Отображает схему парковки с проездом к заданному месту
class ParkSchema extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { // Отрисовка компонента
        let context = this;
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
                    <polyline style={{fill:'none', stroke: 'black', strokeWidth: '2px',
                        transform : `scale(${this.props.store.parkSchema.ratio},${this.props.store.parkSchema.ratio})`}}
                        points={this.props.store.parkSchema.places.filter((el) => el.id === this.props.placeId)[0].path}>
                    </polyline>
                </svg>
            );
        else return <div></div>;
    }
}


// Данный компонент описывает конкретное парковочное место
class ParkingPlace extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { // Отриосвка компонента
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

export default ParkSchema;