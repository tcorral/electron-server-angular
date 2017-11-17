const electron = require('electron')
// Module to control application life.
const app = electron.app

const session = electron.session

console.log(electron);
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  let ieTabPath = "/Users/tomascorralcasas/Library/Application\ Support/Google/Chrome/Default/Extensions/hehijbfgiekmjfkfjpbkbammjbdenadd/10.11.7.1_0/";
  BrowserWindow.addExtension(ieTabPath);
  console.log(BrowserWindow.getExtensions());
  const startPort = 3000;
  const endPort = 3100;
  const host = '127.0.0.1';
  var portscanner = require('portscanner');
  portscanner.findAPortNotInUse(startPort, endPort, host, function(error, port) {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600, title: port});
    if(error) {
        return console.error('There is no free port between ' + startPort + ' and ' + endPort);
    }
    const strUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    const cookie = { url: strUrl, name: 'port', value: port };
    session.defaultSession.cookies.set(cookie, (error) => {
        if (error) {
            return console.error(error);
        }
    });
    // and load the index.html of the app.
    mainWindow.loadURL(strUrl);

    global.port = port;

    // Open the DevTools.
    //  mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
    var server = require('./server');
    server(port);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.