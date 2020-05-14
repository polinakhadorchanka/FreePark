import React from 'react';
import Navigation from "./Navigation.jsx";
import ReservationDate from "./Reservation/ReservationDate.jsx";
import ParkSchema from "./Reservation/ParkSchema.jsx";

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
                    <ReservationDate/>
                    <ParkSchema/>
                </div>
            </main>
        );
    }
}