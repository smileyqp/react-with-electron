import request from './request';
import windowNotification from '../components/windowNotification';
import writeData from './fileHelper'
import config from './config'

export default function login({callback}){
    const data = request('/login', 
    {
      method: 'POST',
      body:{
        username:config.user.username,
        password:config.user.password
      }
    }
    );
    data.then(function(value){
      console.log(value)
      //windowNotification(getCarname(),'asd','')
        // console.log(getCarname())
        carData({callback})
    })
}


async function carData({callback}){
    const data =await request('/search_cars/?Id='+config.carid,{ method: 'GET'});
    areaData(data.Data[0].AreaName,callback)
}


async function areaData(AreaName,callback){
    const data = await request('/areas/?AreaName='+AreaName, { method: 'GET'});
    console.log(data)
    if(callback){callback(data.Data[0])}

  }

  

  //path data
function pathData(Id){
    const data = request('/route/'+Id,{ method: 'GET'});
    data.then(function(value){
      console.log(value)
    var str = JSON.stringify(value.Data.Route); 
    //writeData('nodes.txt',str)
    
    })
  }
