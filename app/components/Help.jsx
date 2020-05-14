import React from 'react';
import Navigation from "./Navigation.jsx";

export default class Help extends React.Component {
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
                    <div className='block' style={{width:'780px', marginRight: '0'}}>
                        <h1 style={{textAlign: 'left'}}>Как это работает?</h1>
                    </div>
                    <div className='block' style={{width:'780px', marginRight: '0'}}>
                        <h1 style={{textAlign: 'left'}}>Помощь</h1>
                    </div>
                </div>
            </main>
        );
    }
}