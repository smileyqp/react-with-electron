import React, { Component } from 'react';
require('../styles/modal.css')
export default class ShutdownModal extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {shutdownVisible,shutdownCancel,shutdownConfirm} = this.props;

        return(
            shutdownVisible?
            <div className='modal-container'>
                <div className='shutdown-container'>
                    <div className='shutdown-warn'>进程已完成，是否继续？</div>
                    <div className='shutdown-btn-con'>
                        <div className='shutdown-btn btn' onClick={shutdownCancel}>取消</div>
                        <div className='shutdown-btn btn' onClick={shutdownConfirm}>确认</div>
                    </div>
                </div>
            </div>
            :
            <></>
        )
    }
}


