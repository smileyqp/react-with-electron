import React, { Component } from 'react';
import stationpic from '../images/station_pic.png';
import caricon from '../images/car.png'
import {getMapcenter} from '../utils/utils'
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
            mapStyle: "amap://styles/grey"
        })
      }


      addStations = (stations) => {
          console.log(stations)
        if(stations != null){
           stations.forEach((item)=>{
                var marker = new window.AMap.Marker({
                    icon:stationpic,
                    position: [item.GPS.Longitude,item.GPS.Latitude],
                    offset: new window.AMap.Pixel(-10,-10), 
                })
                marker.setLabel({
                    offset: new window.AMap.Pixel(0, 0),  //设置文本标注偏移量
                    content: `<div>${item.Name}</div>`, //设置文本标注内容
                    direction: 'bottom' //设置文本标注方位
                });
               map.add(marker)
           })
        }
      }

      addGPS = (gps) => {
            console.log(gps)
            if(gps != null){
                map.setCenter(getMapcenter(gps))
                map.setZoom(15)
                var path = gps.map((item)=>{
                    return [item.Longitude,item.Latitude];
                })
                var gpsPolygon = new window.AMap.Polygon({
                    path: path,
                    isOutline: true,
                    outlineColor: '#ffeeff',
                    borderWeight: 3,
                    strokeColor: "grey", 
                    strokeOpacity: 0.6,
                    strokeWeight: 6,
                    strokeStyle: "solid",
                    fillColor: 'transparent',
                })
                var carmarker = new window.AMap.Marker({
                    icon:caricon,
                    position: getMapcenter(gps),
                    offset: new window.AMap.Pixel(-10,-10), 
                })
                map.add(carmarker)
                carmarker.setAngle(90)
                //map.add(gpsPolygon)

            }
      }
      setMapenter = (cargps) => {
          map.setCenter(new window.AMap.LngLat(cargps[0],cargps[1]))
          var marker = new window.AMap.Marker({
            icon:caricon,
            position: cargps,
            offset: new window.AMap.Pixel(-10,-10), 
        })
        map.add(marker)
      }

    render(){
        const {stoptask,GPS,Stations,cargps} = this.props;
        {Stations?this.addStations(Stations):this.addStations(null)}
        {GPS&&this.addGPS(GPS)}
        {cargps&&this.setMapenter(cargps)}
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


