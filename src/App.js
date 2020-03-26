import React from 'react';
import bg_pic from './images/background.png'
import shutdown from './images/shutdown.png'
import {createRos,sentAim,subscribeMsg} from './utils/RosUtils';
import {Convert} from './utils/ConvertGPS';
import subscribMsg from './utils/SubscribeMsg'
import login from './utils/action'
import carData from './utils/action';
import BeginModal from './components/BeginModal.js';
import CarlistModal from './components/CarlistModal.js';
import Header from './components/Header.js'
import Map from './components/Map'
import ImmediatebeginModal from './components/ImmediatebeginModal'
import ShutdownModal from './components/ShutdownModal'
import StationPanel from './components/StationPanel'
import Queue from './utils/Queue';
import {getNextcurStationkey,setstationMarkers,setPathpolyline,setMapcenter,setCarposition,removeMapcomponent,setMapzoom,setSpecialicon} from './utils/utils'
import {getMapcenter} from './utils/utils'



const { remote, ipcRenderer } = window.require('electron')

const stationQUeue = new Queue();
var timer = null;
var lastdate = null;
var curdate = null;

require('./styles/index.css')
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg:null,
      beginVisible:true,
      carlistVisile:false,
      immediatebeginVisible:false,
      shutdownVisible:false,
      curStationkey:null,
      Stations:null,
      timewait:10,
      stoptaskVisible:false
    }
  }
  componentDidMount(){
    login({
      callback:(res)=>{
        console.log(res)
        this.setState({GPS:res.GPS,Stations:res.Stations})
        if(res.GPS != null){
          setMapcenter(getMapcenter(res.GPS))
        }
        if(res.Stations != null){
          setMapzoom(15)
          console.log(window.map)
          setstationMarkers(res.Stations)
        }
      }});
    const _this = this;
    subscribeMsg(createRos(),subscribMsg).forEach((item)=>{
      switch(item.name){
        case subscribMsg[0].name:
          item.subscribe(function(msg){
            // console.log('0000000'+msg)
            var cargps = Convert(msg.pose.pose.position.x,msg.pose.pose.position.y);
            // console.log(Convert(msg.pose.pose.position.x,msg.pose.pose.position.y))
            setMapcenter(cargps)
            setCarposition(Convert(msg.pose.pose.position.x,msg.pose.pose.position.y))
          })
        break;
        case subscribMsg[1].name:
          item.subscribe(function(msg){
            //console.log('1111111111111'+msg.data[0])
            _this.setState({battery: msg.data[0]})//ok battery
          })
          break;
        case subscribMsg[2].name:
          item.subscribe(function(msg){
            console.log('222222---'+msg.poses.length)
            var planpath= msg.poses.map((item)=>{
              return Convert(item.pose.position.x,item.pose.position.y)
            })
            setPathpolyline(planpath);
          })
          break;
        case subscribMsg[3].name:
          item.subscribe(function(msg){
            //console.log('task end333333333333:'+msg)  //任务结束通知

            if(_this.state.curStationkey !=  null){
              if(lastdate == null){
                var nextStation = getNextcurStationkey(_this.state.curStationkey,_this.state.Stations);
                _this.getShowstations(nextStation)
                _this.setState({immediatebeginVisible:true,curStationkey:nextStation})
                _this.debounce();
                removeMapcomponent(window.pathpolyline)
                lastdate = new Date().getTime();
              }else{
                curdate = new Date().getTime();
                if(parseInt(curdate - lastdate)/1000 > 5){
                  var nextStation = getNextcurStationkey(_this.state.curStationkey,_this.state.Stations);
                  _this.getShowstations(nextStation)
                  _this.setState({immediatebeginVisible:true,curStationkey:nextStation})
                  _this.debounce();
                  removeMapcomponent(window.pathpolyline)
                }
                lastdate = curdate;
              }
            }


          })
          break;
          case subscribMsg[4].name:
            item.subscribe(function(msg){
              //console.log('44444444444444   m/s  '+ msg.data[1]*3.6)
              _this.setState({speed:(msg.data[1]*3.6).toFixed(1)})
            })
            break;
          case subscribMsg[5].name:
            item.subscribe(function(msg){
              _this.setState({mile:msg.data[0].toFixed(1)})
              //console.log('5555mile：'+msg.data[0])
            })
        break;
        default:
          item.subscribe(function(msg){
            console.log('Not a subscribe msg'+msg)
          })
      }
    })
  }
  beginClick = () => {
    this.setState({beginVisible:false,carlistVisile:true})
  }
  carlistCancel=()=>{
    this.setState({beginVisible:true,carlistVisile:false,choosedItem:null})
  }
  carlistConfirm=()=>{   
    if(this.state.choosedItem != null){
      this.setState({carlistVisile:false})
      this.state.Stations.forEach((item,key)=>{
        if(item.Index == this.state.choosedItem){
          this.setState({curStationkey:key,immediatebeginVisible:true})
          this.getShowstations(key);
          this.debounce();
        }
      })
    }  
    this.setState({choosedItem:null})  
  }


  getShowstations = (curkey) => {
    var len = this.state.Stations.length;
    var keyIndex = this.state.Stations[curkey].Index;
    var arr = [];
    stationQUeue.init(this.state.Stations)
    setSpecialicon(curkey,stationQUeue.frontele(curkey))

    this.state.Stations.forEach((item,key)=>{
      if(item.Index == keyIndex){
        if(key != 0){
          arr.push(this.state.Stations[stationQUeue.frontele(key-1)].Name)
        }else{
          arr.push(this.state.Stations[stationQUeue.frontele(stationQUeue.frontele(key))].Name)
        }
        arr.push(this.state.Stations[stationQUeue.frontele(key)].Name)
        arr.push(this.state.Stations[stationQUeue.curele(key)].Name)
        arr.push(this.state.Stations[stationQUeue.nextele(key)].Name)
        if(key == len-1){
          arr.push(this.state.Stations[stationQUeue.nextele(stationQUeue.nextele(key))].Name)
        }else{
          arr.push(this.state.Stations[stationQUeue.nextele(key+1)].Name)
        }
        this.setState({stationsArr:arr})
      }
    })
  }


  debounce = () => {
    var numTimer = 11;
    if(timer !== null){
        clearInterval(timer)
    }
    var _this = this;
    timer = setInterval(function(){
        numTimer >0 ? numTimer-- :clearInterval(timer);
        _this.setState({timewait:numTimer})
        if(numTimer == 0){
          console.log(numTimer)
          _this.setState({immediatebeginVisible:false})
          sentAim(_this.state.Stations[_this.state.curStationkey].Position)
        }
    }, 1000);
  }


  stoptask = () => {

    this.setState({stoptaskVisible:true})

   
  }
  immediatebeginClick = () => {
    clearInterval(timer)
    this.setState({immediatebeginVisible:false,timewait:null})
    sentAim(this.state.Stations[this.state.curStationkey].Position)
  }

  shutdownBtn = () => {
    var status = !this.state.shutdownVisible;
    this.setState({shutdownVisible:status})
  }
  shutdownCancel = () => {
    this.setState({shutdownVisible:false})
  }

  shutdownConfirm = () => {
    console.log('ok')
    ipcRenderer.send('close')
  }

  clickItem = (carid) => {
    this.setState({choosedItem:carid})
  }

  stoptaskCancel = () => {
    this.setState({stoptaskVisible:false})
  }

  stoptaskConfirm = () => {
    if(timer !== null){clearInterval(timer)}
    if(this.state.immediatebeginVisible){
      this.setState({immediatebeginVisible:false,timewait:null})
    }
    this.setState({beginVisible:true,curStationkey:null,stoptaskVisible:false})
  }
  
  render(){

    const beginMdal = (
      <BeginModal
          beginVisible={this.state.beginVisible}
          beginClick={this.beginClick}
        />
    );

    const carlistModal = (
      <CarlistModal
        carlistVisile={this.state.carlistVisile}
        carlistCancel={this.carlistCancel}
        carlistConfirm={this.carlistConfirm}
        Stations={this.state.Stations&&this.state.Stations}
        choosedItem={this.state.choosedItem&&this.state.choosedItem}
        clickItem = {this.clickItem}
      />
    );

      const immediatebeginModal = (
        <ImmediatebeginModal
          immediatebeginVisible={this.state.immediatebeginVisible}
          immediatebeginClick={this.immediatebeginClick}
          timewait = {this.state.timewait&&this.state.timewait}
          stoptask={this.stoptask}
        />
      );

      const shutdownModal = (
        <ShutdownModal
          shutdownVisible={this.state.shutdownVisible}
          shutdownCancel={this.shutdownCancel}
          shutdownConfirm={this.shutdownConfirm}
          textfont={'是否退出程序？'}
          redwarn = {true}
        />
      );


      const stoptaskModal = (
        <ShutdownModal
          shutdownVisible={this.state.stoptaskVisible}
          shutdownCancel={this.stoptaskCancel}
          shutdownConfirm={this.stoptaskConfirm}
          textfont={'是否终止行程？'}
          redwarn={false}
        />
      );


    return (
      <div className="App" >
          {beginMdal}
          {carlistModal}
          {immediatebeginModal}
          {shutdownModal}
          {stoptaskModal}

        <div className="app-container">
          <Header
            shutdown={shutdown}
            shutdownBtn={this.shutdownBtn}
            speed={this.state.speed&&this.state.speed}
            mile={this.state.mile&&this.state.mile}
            battery={this.state.battery&&this.state.battery}
          />
          <StationPanel
            stationsArr = {this.state.stationsArr&&this.state.stationsArr}
          />
          <Map
            stoptask={this.stoptask}
          />
   



        </div>
      </div>
    )
  }
}


export default App;
