const {app,BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')

let mainWindow;

const electron = require('electron');

app.on('ready',()=>{
    var electronScreen = electron.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        // width: size.width,
        // height: size.height,
        width:1024,
        height:768,
        // frame:false,
        webPreferences:{
            nodeIntegration:true            //是指在render process中可以使用node
        }
    })


    const urlLocation = isDev ? 'http://localhost:3000':'null';
    mainWindow.loadURL(urlLocation); 
})