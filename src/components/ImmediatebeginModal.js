import React, { Component } from 'react';
require('../styles/modal.css')
export default class ImmediatebeginModal extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {immediatebeginVisible,immediatebeginClick,timewait,stoptask} = this.props;

        return(
            immediatebeginVisible?
            <div className='modal-container'>
                <div className='immediate-container'>
                    <div className='immediate-time'>{timewait}s</div>
                    <div className='immediate-btn-con'>
                        <div className='immediate-btn immediate-btn-shutdown' onClick={stoptask}>终止行程</div>
                        <div className='immediate-btn immediate-btn-begin' onClick={immediatebeginClick}>立即启动</div>
                    </div>
                    
                    <div className='immediate-warn'>启动时，请注意车身一米范围内无障碍物！</div>
                </div>
            </div>
            :
            <></>
        )
    }
}


