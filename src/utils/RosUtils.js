var ros;
export const createRos = () => {
    if(ros){return ros}
    window.ros = ros;
    ros = new window.ROSLIB.Ros({
        url : 'ws://localhost:9090'
    });
    ros.on('connection', function() {
        console.log('Connected to websocket server.');
    });
    
    ros.on('error', function(error) {
        console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', function() {
        console.log('Connection to websocket server closed.');
    });
    return ros;
}


export const sentAim = (ros,str) => {
    // const stationFile = readData('stations.txt')
    // const stationsAll = JSON.parse(stationFile)
    // for(const i in stationsAll){
    //     if( String(stationsAll[i].Index) === str){
    //         console.log(">>>>>>>>>>下发站点:"+stationsAll[i].Name)
    //         warnfunc('您即将去:'+stationsAll[i].Name+' !',3000)
    //         var sendPosition = stationsAll[i].Position;
    //     }
     
    // }
    // console.log(sendPosition)
    var cmdVel = new window.ROSLIB.Topic({
        ros : ros,
        name : '/global_plan/global_goal',
        messageType : 'geometry_msgs/Pose'
    });
    
    var twist = new window.ROSLIB.Message({
        position : {
            x : str.X,
            y : str.Y,
            z : 0
        },
        orientation : {
            w : Math.cos(str.YAW), 
            x : 0,
            y : 0,
            z : Math.sin(str.YAW)
        }
    });
    console.log(twist)
    cmdVel.publish(twist);
}

export const subscribeMsg = (ros,curMsg) => {
    var listenerArr = curMsg.map((item)=>{
        return new window.ROSLIB.Topic({
            ros : ros,
            name : item.name,
            messageType : item.messageType
        });
    })
    return listenerArr;
}


