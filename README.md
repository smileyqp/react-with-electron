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

# 2、配置打包

##### electron-builder打包

```shell
//安装electron-builder
cnpm install electron-builder --save-dev

//安装webpack-cli
cnpm install webpack-cli --save-dev
```

```shell
//package.json中添加相关build配置
"build": {
    "appId": "smileyqp",
    "productName": "smileyqp",
    "copyright": "Copyright © 2019 ${author}",
    "files": [
      "build/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "directories": {
      "buildResources": "assets"
    },
    "extraMetadata": {
      "main": "./build/main.js"
    },
    "extends": null,
    "mac": {
      "category": "public.app-category.productivity",
      "artifactName": "${productName}-${version}-${arch}.${ext}"
    },
    "dmg": {
      "background": "assets/smileyqp.jpg",
      "icon": "assets/icon.icns",
      "iconSize": 100,
      "contents": [
        {
          "x": 380,
          "y": 280,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 110,
          "y": 280,
          "type": "file"
        }
      ],
      "window": {
        "width": 500,
        "height": 500
      }
    },
    "win": {
      "target": [
        "msi",
        "nsis"
      ],
      "icon": "assets/icon.ico",
      "artifactName": "${productName}-Web-Setup-${version}.${ext}",
      "publisherName": "unity-drive"
    },
    "nsis": {
      "allowToChangeInstallationDirectory": true,
      "oneClick": false,
      "perMachine": false
    }
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  
  
```

```shell
/** webpack配置
**	1、项目根目录文件下touch一个webpack.config.js配置文件
**	2、写相关配置并
**  3、package.json中添加webpack打包命令"buildMain": "webpack",
/**

const path = require('path')

module.exports = {
  target: 'electron-main',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js'
  },
  node: {
    __dirname: false
  }
}
```

```shell
//package.json中添加相关打包命令
		"buildMain": "webpack",
 		"pack": "electron-builder --dir",
    "dist": "electron-builder",
    "prerelease": "npm run build && npm run buildMain",
    "prepack": "npm run build && npm run buildMain",
    "predist": "npm run build && npm run buildMain"

```

