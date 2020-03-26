const {app,BrowserWindow,ipcMain} = require('electron')
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
            nodeIntegration:true,           
            webSecurity: false
        }
    })

    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
    mainWindow.loadURL(urlLocation); 
    ipcMain.on('close',()=>{
        mainWindow.close();
        mainWindow = null;
    })
})


