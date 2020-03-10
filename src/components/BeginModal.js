import React, { Component } from 'react';
require('../styles/modal.css')
export default class BeginModal extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {beginVisible,beginClick} = this.props;

        return(
            beginVisible?
            <div className='modal-container'>
                <div className='begin-btn btn' onClick={beginClick}>
                    <div className='begin-font'></div>
                    <div className='begin-spin-circle circle-a'></div>
                    <div className='begin-spin-circle circle-b'></div>
                    <div className='begin-spin-circle circle-c'></div>
                    <div className='begin-spin-circle circle-d'></div>
                    <div className='begin-spin-circle circle-e'></div>
                    <div className='begin-spin-circle circle-f'></div>
                </div>
            </div>
            :
            <></>
        )
    }
}


