const electron = require('electron');
const { app, globalShortcut, BrowserWindow, shell } = electron;
// app - Module to control application life.
// globalShortcut - Module to create global shortcut.
// BrowserHistory - Module to create native browser window.
// const app = electron.app;
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

function createBrowseitWindow() {
  // Create the browser window.
  // http://electron.atom.io/docs/api/browser-window/#new-browserwindowoptions
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    title: 'Electron browseit',

    // if time
    // x: 0,
    // y: 0,
    // center: true,
    // frame: false,
    // movable: false,
    // resizable: false,
    // alwaysOnTop: true,
    // fullscreen: true,
    // transparent: true,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'browseit.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Global shortcut

  // Register a 'Ctrl+Shift+X' shortcut listener.
  const confluence = globalShortcut.register('Ctrl+Shift+C', () => {
    console.log('go to Confluence');
    shell.openExternal('https://projects.knowit.no/');
  });
  // Register a 'Ctrl+Shift+J' shortcut listener.
  const jira = globalShortcut.register('Ctrl+Shift+J', () => {
    console.log('go to jira');
    shell.openExternal('https://support.knowit.no/');
  });
  const bitbucket = globalShortcut.register('Ctrl+Shift+U', () => {
    console.log('go to to bitbucket');
    shell.openExternal('https://kode.knowit.no/');
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // const template = [{
  //     role: 'Menu',
  //     submenu: [
  //       {
  //         role: 'Submenu 1'
  //       },
  //       {
  //         role: 'Submenu 2'
  //       },
  //     ]
  //   }]
  //
  //
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
  // tray = new Tray('')
  // const contextMenu = Menu.buildFromTemplate([
  //   {label: 'Item1', type: 'radio'},
  //   {label: 'Item2', type: 'radio'},
  //   {label: 'Item3', type: 'radio', checked: true},
  //   {label: 'Item4', type: 'radio'}
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createBrowseitWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createBrowseitWindow();
  }
});
// when app quit
app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
