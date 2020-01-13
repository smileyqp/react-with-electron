const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      // frame:false,
      webPreferences: {
        nodeIntegration: true,
      },
      show: false,
      backgroundColor: '#efefef',
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    const urlLocation = isDev ? 'http://localhost:3000':'null';
    this.loadURL(urlLocation); 
    //this.loadFile(urlLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = AppWindow