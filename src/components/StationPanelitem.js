import React, { Component } from 'react';
import classnames from 'classnames'
require('../styles/index.css')
export default class StationPanelitem extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {stationName,isPg,isSm,isBg,ispgAnimate,isDark} = this.props;
        return(
            isPg?
                <div className={classnames('station-pg',{'station-pg-animate':ispgAnimate})}></div>
            :
            <div className={classnames({'station-sm-circle':isSm},{'station-sm-circle-dark':isDark},{'station-sm-circle-light':!isDark},{'station-bg-circle':isBg})}>
                {isBg&&<div className='station-bg-title'>起始站</div>}
                <div className='station-font-container'>
                    <div className={classnames('station-font-item',{'station-bg-color':isBg})}>{stationName}</div>
                </div>
            </div>
        )
        
    }
}


