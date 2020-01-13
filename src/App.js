import React from 'react';
import logo from './logo.svg';
import './App.css';
import bg_pic from './images/background.png'
import shutdown from './images/shutdown.png'
import {createRos,sentAim,subscribeMsg} from './utils/RosUtils';
import {Convert} from './utils/ConvertGPS';
import subscribMsg from './utils/SubscribeMsg'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg:null
    }
  }
  componentWillMount(){
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
  render(){
    console.log(this.state&&this.state.msg)
    return (
      <div className="App" >
        <div className="app-container" style={{backgroundImage:`url(${bg_pic})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
          <div className="header">
            <div className="header-left">
              <div>速度：10km/h</div>
              <div>里程：10km</div>
            </div>
            <div className="header-right">
              <div>电量：100%</div>
              <img src={shutdown} className="shutdown"/>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}


export default App;
