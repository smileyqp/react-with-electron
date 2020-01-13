
const SubscribMsg = [
    {
        name : '/current_odom',
        messageType : 'nav_msgs/Odometry'
    },{
        name : '/chassis/bms',
        messageType : 'udrive_msgs/ChassisBms'
    },{
        name : '/global_plan/global_path',
        messageType : 'nav_msgs/Path'
    },{
        name : '/RobotPort_GetReached_Info',
        messageType : 'std_msgs/String'
    },{
      name : '/golfcar/odom',
      messageType : 'nav_msgs/Odometry'
    }
  ]
  export default SubscribMsg;