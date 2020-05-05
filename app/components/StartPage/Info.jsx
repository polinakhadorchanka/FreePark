import React from 'react';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='block' style={{width:'600px', minHeight: '100px', marginRight: '0'}}>
                {this.props.text}
            </div>
        );
    }
}