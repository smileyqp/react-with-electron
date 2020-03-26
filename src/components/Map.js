import React, { Component } from 'react';
import caricon from '../images/car.png'
require('../styles/index.css')

export default class Map extends Component{
    constructor(props) {
        super(props);
      }
      componentDidMount(){
          this.init();
      }
      init(){
        console.log('初始化')
        let mapContainer = this.refs.mapContainer;
        window.map = new window.AMap.Map(mapContainer,{
            resizeEnable: true, 
            zoom:11, 
            mapStyle: "amap://styles/grey"
        })
        window.carmarker = new window.AMap.Marker({
            icon:caricon,
            position: [0,0],
            offset: new window.AMap.Pixel(-10,-10), 
        })
        window.map.add(window.carmarker)
    }

    render(){
        const {stoptask} = this.props;
      
        return(
            <div className='map'>
                <div className='map-stopbtn btn' onClick={stoptask}>
                    <div className='map-stopbtn-font btn'>终止行程</div>
                </div>
                <div className='map-con'>
                    <div className='map-container'>
                        <div ref='mapContainer' id='map' className='map-itself'></div>
                    </div>
                </div>
               
            </div>
           
        )
    }
}


