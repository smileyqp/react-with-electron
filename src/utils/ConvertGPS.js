// 墨卡托x y 转经纬度
//使用时调用Convert()函数
import config from './config'
var _IterativeTimes = 10;   //迭代次数为10
var _IterativeValue = 0;      //迭代初始值
var _B0 = 0;
var _L0 = 0;
var _A = 1;
var _B = 1;
var yaw = 90/180.0*Math.PI
var b0,l0;

function FromProj(X,Y) {
    var f/*扁率*/, e/*第一偏心率*/, e_/*第二偏心率*/, NB0/*卯酉圈曲率半径*/, K, dtemp;
    var E = Math.exp(1);
    var B;//纬度
    var L;//经度
    var result = [];

    if (_A <= 0 || _B <= 0) {
        return 1;
    }

    f = (_A - _B) / _A;
    dtemp = 1 - (_B / _A) * (_B / _A);

    if(dtemp < 0) {
        return 1;
    }

    e = Math.sqrt(dtemp);
    dtemp = (_A / _B) * (_A / _B) - 1;

    if(dtemp < 0) {
        return 1;
    }

    e_ = Math.sqrt(dtemp);
    NB0 = ((_A * _A) / _B) / Math.sqrt(1 + e_ * e_ * Math.cos(_B0) * Math.cos(_B0));

    K = NB0 * Math.cos(_B0);
    L = Y / K + _L0;
    B = 40;

    for(var i = 0; i < _IterativeTimes; i++) {
        B = Math.PI / 2 - 2.0 * Math.atan(Math.exp(-X / K) * Math.exp(e / 2 * Math.log((1 - e * Math.sin(B)) / (1 + e * Math.sin(B))) ));
    }
    result.push(L);
    result.push(B);
    return result;
}

function setAB(a,b) {
    if (a <= 0 || b <= 0) 
        return;
    _A = a;
    _B = b;
}

function DegreeToRad(degree){
    return Math.PI * (degree/180);
}

function SetB0(b0) {
    if(b0 < -Math.PI / 2 || b0 > Math.PI / 2)
        return;
    
    _B0 = b0;
}

function SetL0(l0)
{
    if (l0 < -Math.PI || l0 > Math.PI)
        return;

    _L0 = l0;

}

function ConvertToGPS(x,y) {
    var b = 0;
    var l = 0;
    var longitude;
    var latitude;
    var resultArray;
    var finalResult = [];
    var o_x_, o_y_, x_, y_;

    o_x_ = x * 0.97;
    o_y_ = -y * 0.93;
    x_ = Math.cos(yaw) * o_x_ - Math.sin(yaw) * o_y_;
    y_ = Math.sin(yaw) * o_x_ + Math.cos(yaw) * o_y_;

    resultArray = FromProj(x_,y_);
    longitude = resultArray[0] / Math.PI * 180;
    latitude = b0 + resultArray[1] / Math.PI * 180;
    // console.log(longitude,latitude);
    finalResult.push(longitude);
    finalResult.push(latitude);
    return finalResult;
}

// 传入x y，返回的是数组 [经度，纬度]
export const Convert  = (x,y) => {
    b0 = config.mapConvert.b0;
    l0 = config.mapConvert.l0;
    setAB(6378137.0, 6356752.3142);
    SetB0(DegreeToRad(b0));
    SetL0(DegreeToRad(l0));
    return ConvertToGPS(x,y);
}