import React, { Component } from 'react';
require('../styles/modal.css')
export default class ImmediatebeginModal extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {immediatebeginVisible,immediatebeginClick} = this.props;

        return(
            immediatebeginVisible?
            <div className='modal-container'>
                <div className='immediate-container'>
                    <div className='immediate-time'>160s</div>
                    <div className='immediate-btn' onClick={immediatebeginClick}>立即启动</div>
                    <div className='immediate-warn'>启动时，请注意车身一米范围内无障碍物！</div>
                </div>
            </div>
            :
            <></>
        )
    }
}


