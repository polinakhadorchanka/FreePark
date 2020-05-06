import React from 'react';
import Navigation from "./Navigation.jsx";
import PersonalInfo from "./Profile/PersonalInfo.jsx";
import Autos from "./Profile/Autos.jsx";
import AutoForm from "./Profile/AutoForm.jsx";

export default class Profile extends React.Component {
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
                    <PersonalInfo/>
                    <Autos/>
                    <AutoForm/>
                </div>
            </main>
        );
    }
}