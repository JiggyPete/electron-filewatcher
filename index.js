let startUrl = ""
let dirsToWatch = []
let dirsToIgnore = []

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(startUrl)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})



var chokidar = require('chokidar');


var watcher = chokidar.watch(dirsToWatch, {ignored: dirsToIgnore})

watcher.on('change', (path, stats) => {
  if (stats) {
    console.log(`File ${path} changed size to ${stats.size}`)
    mainWindow.reload()
  }
});
