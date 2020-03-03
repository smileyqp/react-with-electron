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
                <div className='begin-btn' onClick={beginClick}>

                </div>
            </div>
            :
            <></>
        )
    }
}


