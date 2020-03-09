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

require('./styles/index.css')
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg:null,
      beginVisible:false,
      carlistVisile:false,
      immediatebeginVisible:false,
      shutdownVisible:false
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
    this.setState({beginVisible:true,carlistVisile:false})
  }
  carlistConfirm=()=>{
    this.setState({carlistVisile:false})
  }
  stoptask = () => {
    this.setState({beginVisible:true})
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


        <div className="app-container" style={{backgroundImage:`url(${bg_pic})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
          <Header
            shutdown={shutdown}
            shutdownBtn={this.shutdownBtn}
            speed={this.state.speed}
            mile={this.state.mile}
            battery={this.state.battery}
          />
          <div className='station'>
            <div className='station-sm-circle station-sm-circle-dark'>
              <div className='station-font-container'>
                <div className='station-font-item'>站点1</div>
              </div>
            </div>
            <div className='station-pg'></div>
            <div className='station-sm-circle station-sm-circle-dark'>
              <div className='station-font-container'>
                <div className='station-font-item'>站点1</div>
              </div>
            </div>
            <div className='station-bg-circle'>
              <div className='station-bg-title'>起始站</div>
              <div className='station-font-container'>
                  <div className='station-font-item station-bg-color'>站点1站阿都是大手笔点2站点3</div>
              </div>
            </div>
            <div className='station-sm-circle station-sm-circle-light'>
              <div className='station-font-container'>
                  <div className='station-font-item'>站点1站阿都是大手笔点2站点3</div>
              </div>
            </div>
            <div className='station-pg'></div>
            <div className='station-sm-circle station-sm-circle-light'>
              <div className='station-font-container'>
                <div className='station-font-item'>站点1</div>
              </div>
            </div>
            

          </div>


        <Map
          stoptask={this.stoptask}
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
