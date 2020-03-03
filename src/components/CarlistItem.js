import React, { Component } from 'react';
require('../styles/carlistitem.css')
export default class CarlistItem extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {type,carname} = this.props;
        switch(type){
            case 'choosed':
                return <div className='carlist-item carlist-item-choosed'>
                    <div className='carlist-item-inner-choosed'>{carname}</div>
                </div>
                break;
            default:
                return<div className='carlist-item'>
                    <div className='carlist-item-inner'>{carname}</div>
                </div>
                break;
        }
    }
}


