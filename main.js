const {app,BrowserWindow,session} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')


let mainWindow;

const electron = require('electron');

app.on('ready',()=>{
    var electronScreen = electron.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame:false,
        webPreferences:{
            nodeIntegration:true,            //是指在render process中可以使用node
            webSecurity: false
        }
    })
    // const filter = {
    //     urls: ['*://webapi.amap.com/*'    ]
    //   }
      
    //   session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    //       //console.log(details)
    //       console.log(details)
    //     //   var str = 'http://'
    //     //   var url = details.url.replace(str,'file://')
    //     //   console.log('url:'+url)
    //     //   details['url'] = url;
    //     //     console.log('测试：'+details.url)
    //     details['url'] = 'http://0.0.0.1'
    //     console.log('测试'+details.url+'//////'+details.referrer)
    //     details.requestHeaders['User-Agent'] = 'MyAgent'
    //     callback({requestHeaders:details.requestHeaders})
    //   })

    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
    mainWindow.loadURL(urlLocation); 
    mainWindow.on('close',()=>{
        mainWindow = null;
    })
})


