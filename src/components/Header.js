

import React, { Component } from 'react';
require('../styles/index.css')
export default class Header extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {shutdown,shutdownBtn} = this.props;
        return(
            <div className="header">
                <div className="header-left">
                    <div className='header-speed'>速度：10km/h</div>
                    <div className='header-mile'>里程：10km</div>
                </div>
                <div className="header-right">
                    <div className='header-battery'>电量：100%</div>
                    <img src={shutdown} onClick={shutdownBtn} className="shutdown btn"/>
                </div>
            </div>
        )
    }
}






