import request from './request';
import windowNotification from '../components/windowNotification';
import getCarname from './utils';
import writeData from './fileHelper'

export default function login({callback}){
    const data = request('/login', 
    {
      method: 'POST',
      body:{
        username:'smileyqp',
        password:'123456'
      }
    }
    );
    data.then(function(value){
      console.log(value)
      //windowNotification(getCarname(),'asd','')
        console.log(getCarname())
        carData({callback})
    })
}


async function carData({callback}){
    const data =await request('/search_cars/?Id=20190101',{ method: 'GET'});
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
