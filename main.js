const {app,BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow;

const electron = require('electron');

app.on('ready',()=>{
    var electronScreen = electron.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        // frame:false,
        webPreferences:{
            nodeIntegration:true            //是指在render process中可以使用node
        }
    })


    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
    mainWindow.loadURL(urlLocation); 
    mainWindow.on('close',()=>{
        mainWindow = null;
    })
})