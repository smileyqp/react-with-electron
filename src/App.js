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
import UdiMap from './components/UdiMap';
import Map from './components/Map'
import ImmediatebeginModal from './components/ImmediatebeginModal'
import ShutdownModal from './components/ShutdownModal'
import StationPanel from './components/StationPanel'
import Queue from './utils/Queue';
import getShowstationlist from './utils/utils'

const stationQUeue = new Queue();
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
      curStationkey:null
    }
  }
  componentWillMount(){
    login({
      callback:(res)=>{
        console.log(res)
        this.setState({GPS:res.GPS,Stations:res.Stations})
      }});
    const _this = this;
    subscribeMsg(createRos(),subscribMsg).forEach((item)=>{
      switch(item.name){
        case subscribMsg[0].name:
          item.subscribe(function(msg){
            console.log(msg)
            var cargps = Convert(msg.pose.pose.position.x,msg.pose.pose.position.y)
            _this.setState({cargps:cargps})
          })
          break;
        case subscribMsg[1].name:
          item.subscribe(function(msg){
            console.log(msg)
            _this.setState({battery:msg.battery_percentage})
          })
          break;
        case subscribMsg[2].name:
          item.subscribe(function(msg){
            console.log(msg)
            _this.setState({msg:msg})
          })
          break;
        case subscribMsg[3].name:
          item.subscribe(function(msg){
            console.log(msg)
            _this.setState({msg:msg})
          })
          break;
          case subscribMsg[4].name:
            item.subscribe(function(msg){
              console.log(msg)
              _this.setState({speed:msg.twist.twist.linear.x.toFixed(2)})
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





  stoptask = () => {
    this.setState({beginVisible:true,curStationkey:null})
  }
  immediatebeginClick = () => {
    this.setState({immediatebeginVisible:false})
  }

  shutdownBtn = () => {
    var status = !this.state.shutdownVisible;
    this.setState({shutdownVisible:status})
  }
  shutdownCancel = () => {
    this.setState({shutdownVisible:false})
  }

  shutdownConfirm = () => {

  }

  clickItem = (carid) => {
    this.setState({choosedItem:carid})
  }
  
  render(){
    console.log(this.state&&this.state.msg)
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
        />
      );

      const shutdownModal = (
        <ShutdownModal
          shutdownVisible={this.state.shutdownVisible}
          shutdownCancel={this.shutdownCancel}
          shutdownConfirm={this.shutdownConfirm}
        />
      );


    return (
      <div className="App" >
          {beginMdal}
          {carlistModal}
          {immediatebeginModal}
          {shutdownModal}


        <div className="app-container">
          <Header
            shutdown={shutdown}
            shutdownBtn={this.shutdownBtn}
            speed={this.state.speed}
            mile={this.state.mile}
            battery={this.state.battery}
          />
          <StationPanel
            stationsArr = {this.state.stationsArr&&this.state.stationsArr}
          />
          <Map
            stoptask={this.stoptask}
            GPS={this.state.GPS&&this.state.GPS}
            Stations={this.state.Stations}
          />


          {/* <UdiMap
            stoptask={this.stoptask}
          /> */}


    



         


        



        </div>
      </div>
    )
  }
}


export default App;
