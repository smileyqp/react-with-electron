
const SubscribMsg = [
    {
        name : '/current_odom',//车辆位置
        messageType : 'nav_msgs/Odometry'
    },{
        name : '/chassis/bms',//电池电量
        messageType : 'udrive_msgs/ChassisBms'
    },{
        name : '/global_plan/global_path',//全局规划路径
        messageType : 'nav_msgs/Path'
    },{
        name : '/RobotPort_GetReached_Info',//任务结束通知
        messageType : 'std_msgs/String'
    },{
        name : '/golfcar/odom',//速度
        messageType : 'nav_msgs/Odometry'
    },{
        name : '/odemetry_distance',//mile
        messageType : 'std_msgs/Float32'
    },
    {
        name : '/global_plan/global_goal',//下发
        messageType : 'geometry_msgs/Pose'
    },
  ]
  export default SubscribMsg;