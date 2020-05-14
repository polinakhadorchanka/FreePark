import React from 'react';
import Navigation from "./Navigation.jsx";
import ReservationInfo from "./MyReservation/ReservationInfo.jsx";
import Map from "./MyReservation/Map.jsx";

export default class MyReservation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <div className='column' style={{width: '180px'}}>
                    <Navigation/>
                </div>
                <div className='column' style={{width: '830px'}}>
                    <ReservationInfo/>
                    <Map/>
                </div>
            </main>
        );
    }
}