import React, { Component } from 'react';
import classnames from 'classnames'
require('../styles/carlistitem.css')
export default class CarlistItem extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {carname,carid,choosedItem,clickItem} = this.props;

        const choosed = choosedItem==carid?true:false;

        return(
            <div className={classnames('carlist-item',{'carlist-item-choosed':choosed})}>
                <div className={classnames({'carlist-item-inner':!choosed},{'carlist-item-inner-choosed':choosed})} onClick={()=>{clickItem(carid)}}>{carname}</div>
            </div>
        )
    }
}


