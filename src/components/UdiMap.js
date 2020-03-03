

import React, { Component } from 'react';
import { Map } from 'react-amap';
import config from '../utils/config'
require('../styles/index.css')

export default class UdiMap extends Component{
    constructor(props) {
        super(props);
      }
    render(){
      const {stoptask} = this.props;

        return(
            <div className='map'>
            <div className='map-stopbtn' onClick={stoptask}>
              <div className='map-stopbtn-font'>终止行程</div>
            </div>
            <div className='map-container'>
            <Map mapStyle={config.map.mapStyle} amapkey={config.map.amapkey} zoom='17' ></Map>
            </div>
          </div>
        )
    }
}






