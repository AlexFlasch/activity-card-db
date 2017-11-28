import { app, BrowserWindow, ipcMain } from 'electron'; // eslint-disable-line

import * as csv from './system/csv-handler';

/**
* Set `__static` path to static files in production
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
*/
if(process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

async function createWindow() {
    /**
    * Initial window options
    */
    mainWindow = new BrowserWindow({
        height: 750,
        useContentSize: true,
        width: 650,
        resizable: false,
        maximizable: false,
    });

    const files = await csv.getCSVFiles();
    const columns = await csv.getCSVColumns();

    mainWindow.csvFiles = files;
    mainWindow.csvColumns = columns;

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('get-csv-files', (event) => {
    const files = csv.getCSVFiles();
    event.sender.send('found-csv-files', files);
});

ipcMain.on('get-csv-file', async (event, arg) => {
    const file = await csv.getCSVFile(arg);
    event.sender.send('found-csv-file', file);
});

ipcMain.on('create-csv-file', (event, arg) => {
    const success = csv.generateCSVFile(arg);
    event.sender.send('csv-file-created', success);
});

ipcMain.on('add-row', (event, arg) => {
    const success = csv.addRowToCSVFile(arg.filename, arg.row);
    event.sender.send('row-added', success);
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
