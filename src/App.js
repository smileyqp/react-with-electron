import React from 'react';
import bg_pic from './images/background.png'
import shutdown from './images/shutdown.png'
import {createRos,sentAim,subscribeMsg} from './utils/RosUtils';
import {Convert} from './utils/ConvertGPS';
import subscribMsg from './utils/SubscribeMsg'
import login from './utils/action'
import BeginModal from './components/BeginModal.js';
import CarlistModal from './components/CarlistModal.js';
import Header from './components/Header.js'
import UdiMap from './components/UdiMap'


require('./styles/index.css')
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg:null,
      beginVisible:false,
      carlistVisile:false
    }
  }
  componentWillMount(){
    login();
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
    return (
      <div className="App" >
          {beginMdal}
          {carlistModal}
        <div className="app-container" style={{backgroundImage:`url(${bg_pic})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
          <Header
            shutdown={shutdown}
            speed={this.state.speed}
            mile={this.state.mile}
            battery={this.state.battery}
          />
          <div className='station'>
            <div className='station-sm-circle'></div>
            <div className='station-pg'></div>
            <div className='station-sm-circle'></div>
            <div className='station-bg-circle'></div>
            <div className='station-sm-circle'></div>
            <div className='station-pg'></div>
            <div className='station-sm-circle'></div>
            

          </div>



          <UdiMap
            stoptask={this.stoptask}
          />


    



         


        



        </div>
      </div>
    )
  }
}


export default App;
