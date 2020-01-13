# 1、环境搭建

```shell
//初始化项目xxx
npx create-react-app xxx		

//安装electron
npm install electron --save-dev
```

##### 创建main.js

```shell
const {app,BrowserWindow} = require('electron')

let mainWindow;

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width:1024,
        height:680,
        webPreferences:{
            nodeIntegration:true            //是指在render process中可以使用node
        }
    })
})
```

##### 安装electron-is-dev库，判断是否是开发环境

```shell
//安装
cnpm install electron-is-dev --save-dev

//使用
const isDev = require('electron-is-dev')

 const urlLocation = isDev ? 'http://localhost:3000':'null';
 mainWindow.loadURL(urlLocation); 
```

> 注意：isDev判断是否为开发环境；
>
> - 开发环境就loadURL为localhost:3000
> - 非开发环境：加载打包之后的静态文件，这里先留存之后再修改

##### 修改package.json

```shell
//添加main.js
 "main":"main.js",
 
 //添加electron启动script
  "dev":"electron ."
```

##### 查看electron环境

```shell
//开启react的localhost:3000
npm start

//开启electron
cnpm run dev
```

##### concurrently同步

指的是npm start和electron .同时进行

```shell
//安装
cnpm install concurrently --save-dev
```

##### wait-on等待命令运行完

等待react的localhost:3000运行起来之后才去开始electron .

```shell
//安装
cnpm install wait-on --save-dev

//package.json中将script的dev改成
   "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"npm start\""
```

> 注意：concurrently是让两个命令同时执行；wait-on是等待localhost:3000加载完成之后再执行`electron .`，直接`npm run dev `就可以同时开启浏览器和electron的GUI了

##### cross-env控制系统不开启浏览器中的localhost:3000

```shell
//安装
cnpm install cross-dev

//修改package.json
    "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\""
```

> 注意：之后值开启electron程序，并不会开启localhost:3000

