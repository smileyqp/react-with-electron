import React, { Component } from 'react';
import CarlistItem from './CarlistItem';
require('../styles/modal.css')
export default class CarlistModal extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {carlistVisile,carlistConfirm,carlistCancel,carChoose} = this.props;

        return(
            carlistVisile?
            <div className='modal-container'>
                <div className='carlist-panel' >
                    <div className='carlist-panel-top'>
                            
                        <div className='carlist-panel-top-font'>请选择您的起始站点</div>
                        
                    </div>
                    <div className='carlist-panel-line'></div>
                    <div className='carlist-panel-body'>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111' type='choosed'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111'/>
                        <CarlistItem carname='111' type='choosed'/>
                    </div>
                    <div className='carlist-panel-bottom'>
                        <div className='carlist-bottom-btn btn' onClick={carlistCancel}>取消</div>
                        <div className='carlist-bottom-btn btn' onClick={carlistConfirm}>确认</div>
                    </div>
                </div>
            </div>
            :
            <></>
        )
    }
}


