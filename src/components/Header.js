

import React, { Component } from 'react';
require('../styles/index.css')
export default class Header extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {shutdown,shutdownBtn,speed,battery,mile} = this.props;
        const speedCon = <div className='header-speed'>速度：{speed?speed:0}km/h</div>;
        const mileCon = <div className='header-mile'>里程：{mile?mile:0}km</div>
        const batteryCon = <div className='header-battery'>电量：{battery?battery:0}%</div>
        return(
            <div className="header">
                <div className="header-left">
                    {speedCon}
                    {mileCon}
                </div>
                <div className="header-right">
                    {batteryCon}
                    <img src={shutdown} onClick={shutdownBtn} className="shutdown btn"/>
                </div>
            </div>
        )
    }
}






