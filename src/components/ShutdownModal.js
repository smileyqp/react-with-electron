import React, { Component } from 'react';
require('../styles/modal.css')
export default class ShutdownModal extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {shutdownVisible,shutdownCancel,shutdownConfirm,textfont,redwarn} = this.props;

        return(
            shutdownVisible?
            <div className='modal-container'>
                <div className='shutdown-container'>
                    <div className='shutdown-warn'>{textfont}</div>
                    {redwarn&&<div className='shutdown-warn-red'>退出程序后，任务将不再进行</div>}
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


