import React, { Component } from 'react';
import StationPanelitem from './StationPanelitem'
require('../styles/index.css')
export default class StationPanel extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        const {stationsArr} = this.props;
        return(
            <div className='station'>
                <StationPanelitem
                    stationName={stationsArr&&stationsArr[0]}
                    isPg={false}
                    isSm={true}
                    isBg={false}
                    isDark={true}
                />
                 <StationPanelitem
                    isPg={true}
                />
                 <StationPanelitem
                    stationName={stationsArr&&stationsArr[1]}
                    isPg={false}
                    isSm={true}
                    isBg={false}
                    isDark={true}
                />
                <StationPanelitem
                    isPg={true}
                    ispgAnimate={true}
                />
                 <StationPanelitem
                    stationName={stationsArr&&stationsArr[2]}
                    isPg={false}
                    isSm={false}
                    isBg={true}
                    isDark={true}
                />
                 <StationPanelitem
                    isPg={true}
                />
                <StationPanelitem
                    stationName={stationsArr&&stationsArr[3]}
                    isPg={false}
                    isSm={true}
                    isBg={false}
                    isDark={false}
                />
                <StationPanelitem
                    isPg={true}
                />
                <StationPanelitem
                    stationName={stationsArr&&stationsArr[4]}
                    isPg={false}
                    isSm={true}
                    isBg={false}
                    isDark={false}
                />
            </div>
        )
    }
}


