import request from './request';
import windowNotification from '../components/windowNotification';
import getCarname from './utils';

export default function login(){
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
    })
}


export function fetchAreadata(){
    
}


