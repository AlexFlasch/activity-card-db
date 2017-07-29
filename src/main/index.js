import { app, BrowserWindow, ipcMain } from 'electron'; // eslint-disable-line
import fs from 'fs';
import csv from 'csv';

import csvColumns from './../../static/csv-columns.json';

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

function createWindow() {
    /**
    * Initial window options
    */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
    });

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

function getCSVFiles() {
    const files = fs.readdir('./../../static/csv/', (err, files) => {
        debugger;
        return files;
    });

    debugger;
    return files;
}

async function getCSVFile(fileName) {
    const csvContents = fs.readFileSync(`./../../static/csv/${fileName}`);

    // columns: true tells the parser to auto-discover the column names
    // using the header line in the csv file
    const parser = csv.parse(csvContents, { columns: true });

    const csvArr = [];

    parser.on('readable', () => {
        const record = parser.read();

        debugger;

        // record will be null if it has reached the
        // end of the readable stream
        // as long as its not null, push the record
        if(record) {
            csvArr.push(record);
        }
    });

    await parser.on('finish', () => parser.end());

    return csvArr;
}

function generateCSVFile(fileName) {
    // take all keys in the csv-columns.json file, join them
    // into a single string with a comma separating each key's name.
    const csvHeader = Object.keys(csvColumns).join(',');

    return fs.writeFile(`./../../static/csv/${fileName}`, csvHeader, (err) => {
        if(err) {
            console.err(err);

            // log error and let renderer know that something bad happened
            return false;
        }

        return true;
    });
}

ipcMain.on('get-csv-files', () => getCSVFiles());

ipcMain.on('get-csv-file', (event, arg) => getCSVFile(arg));

ipcMain.on('create-csv-file', (event, arg) => generateCSVFile(arg));

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
