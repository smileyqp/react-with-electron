// const os = require('os');

// export default function getCarname(){
//     return os.hostname();
// }
// const {ipcRenderer} = require('electron')

export const getMapcenter = (gps) => {
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
}

export const getNextcurStationkey = (key,arr) => {
    if(key == arr.len.length - 1){
      return 1
    }else{
      return key +1
    }
  }


