import path from 'path';
import fs from 'fs';
import csv from 'csv';
import promisify from 'util.promisify';

import csvColumns from './../../../static/csv-columns.json';
import promisifyOn from './../util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export async function getCSVFiles() {
    let files = [];

    try {
        files = await readdir(path.join(__dirname, './../../../static/csv/'));
    } catch(err) {
        console.error(`ERROR: ${err}`); // eslint-disable-line
    }

    // filter out the .gitkeep file
    files = files.filter(filename => filename.indexOf('.gitkeep') === -1);

    return files;
}

export function getCSVColumns() {
    const columns = require('./../../../static/csv-columns');

    return columns;
}

export async function updateCSVColumns(columns) {
    let success = true;

    try {
        await writeFile(path.join(__dirname, './../../../static/csv-columns.json'), columns);
    } catch(err) {
        console.error(`ERROR: ${err}`); // eslint-disable-line
        success = false;
    }

    return success;
}

export async function getCSVFile(fileName) {
    const csvContents = await readFile(path.join(__dirname, `./../../../static/csv/${fileName}`));

    // columns: true tells the parser to auto-discover the column names
    // using the header line in the csv file
    const parser = csv.parse(csvContents, { columns: true });

    const csvArr = [];

    parser.on('readable', () => {
        const record = parser.read();

        // record will be null if it has reached the
        // end of the readable stream
        // as long as its not null, push the record
        if(record) {
            csvArr.push(record);
        }
    });

    // parser.on('finish', () => parser.end());
    await promisifyOn(parser, 'finish');

    return csvArr;
}

export function generateCSVFile(fileOptions) {
    // take all keys in the csv-columns.json file, join them
    // into a single string with a comma separating each key's name.
    const csvHeader = Object.keys(csvColumns).join(',');

    let result = true;

    try {
        fs.writeFileSync(path.join(__dirname, `./../../../static/csv/${fileOptions.filename}`), csvHeader);
    } catch(err) {
        if(err) {
            /* eslint-disable no-console */
            console.error(err);
            /* eslint-enable no-console */

            // log error and let renderer know that something bad happened
            result = false;
        }
    }

    return result;
}
