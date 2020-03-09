import React, { Component } from 'react';
require('../styles/index.css')

var map;
export default class Map extends Component{
    constructor(props) {
        super(props);
      }
      componentDidMount(){
          this.init();
      }
      init(){
          console.log('初始化')
          console.log(this.refs.map)
          let mapContainer = this.refs.mapContainer;
           map = new window.AMap.Map(mapContainer,{
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom:11, //初始化地图层级
            center: [116.397428, 39.90923], //初始化地图中心点
            mapStyle: "amap://styles/dark"
        })

        
      }

    render(){
        const {stoptask} = this.props;

        return(
            <div className='map'>
                <div className='map-stopbtn btn' onClick={stoptask}>
                    <div className='map-stopbtn-font btn'>终止行程</div>
                </div>
                
                <div className='map-container'>
                    <div ref='mapContainer' id='map' className='map-itself'></div>
                </div>
            </div>
           
        )
    }
}


