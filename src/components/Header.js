

import React, { Component } from 'react';
require('../styles/index.css')
export default class Header extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {shutdown,shutdownBtn,speed,battery,mile} = this.props;
        return(
            <div className="header">
                <div className="header-left">
                    <div className='header-speed'>速度：{speed?speed:0}km/h</div>
                    <div className='header-mile'>里程：{mile?mile:0}km</div>
                </div>
                <div className="header-right">
                    <div className='header-battery'>电量：{battery?battery:0}%</div>
                    <img src={shutdown} onClick={shutdownBtn} className="shutdown btn"/>
                </div>
            </div>
        )
    }
}






