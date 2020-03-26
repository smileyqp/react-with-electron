// const os = require('os');

// export default function getCarname(){
//     return os.hostname();
// }
// const {ipcRenderer} = require('electron')
import stationpic from '../images/station_pic.png';
export const getMapcenter = (gps) => {
   try{
    if(Array.isArray(gps)){
      var zoomLon = 0;
      var zoomLat = 0;
      var len = gps.length;
      gps.forEach((item)=>{
          zoomLon = item.Longitude +zoomLon;
          zoomLat = item.Latitude + zoomLat;
      })
      return [zoomLon/len,zoomLat/len]
  }
  }catch(err){
    console.log(err)
  }
}

export const getNextcurStationkey = (key,arr) => {
  try{
    if(Array.isArray(arr)){
      if(key == arr.length - 1 && arr != null){
        return 1
      }else{
        return key +1
      }
    }
  }catch(err){
    console.log(err)
  }
}


export const setstationMarkers = (arr) => {
  try{
    if(Array.isArray(arr)){
      arr.forEach((item)=>{
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
        window.map.add(marker)
     })
    }
  }catch(err){
    console.log(err)
  }
}

export const setPathpolyline = (patharr) => {
 try{
  if(Array.isArray(patharr)){
    window.pathpolyline = new window.AMap.Polyline({
      path: patharr,            // 设置线覆盖物路径
      showDir:true,
      strokeColor:'#24FFFF',
      strokeOpacity:0.3,
      strokeWeight: 4  
    })
    window.map.add(window.pathpolyline)
  }
  }catch(err){
    console.log(err)
  }
}


export const setMapcenter = (center) => {
  window.map.setCenter(center)
}

export const setCarposition = (position) => {
  window.carmarker.setPosition(position)
}

export const removeMapcomponent = (component) => {
  try{
    if(typeof component != 'undefined'){
      window.map.remove(component)
    }
  }catch(err){
    console.log(err)
  }
}

export const setMapzoom = (num) => {
  try{
    window.map.setZoom(num)
  }catch(err){
    console.log(err)
  }
}

