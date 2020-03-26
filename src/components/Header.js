

import React, { Component } from 'react';
require('../styles/index.css')
export default class Header extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {shutdown,shutdownBtn,speed,battery,mile} = this.props;
        const speedCon = <div className='header-speed'>
                            <div className='header-font'>速度：{speed?speed:0}</div>
                            <div className='header-sm'>km/h</div>
                        </div>;
        const mileCon = <div className='header-mile'>
                            <div className='header-font'>里程：{mile?mile:0}</div>
                            <div className='header-sm'>km</div>
                        </div>
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






