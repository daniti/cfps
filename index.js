var fs = require('fs');
var { google } = require('googleapis');

var csvjson = require('csvjson');
var config = require('./config');

var auth = require('./auth');

auth.call(getCurrentCFPs)

function getCurrentCFPs(auth) {
    var sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: config.sheetID,
        range: config.sheetRange,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            mergeCFPs(rows, csvToJson(config.csv), auth);
        } else {
            console.log('No data found.');
        }
    });
}

function csvToJson(csv) {
    var data = fs.readFileSync('./' + csv, { encoding: 'utf8' });
    var options = {
        delimiter: ',', // optional
        quote: '"' // optional
    };
    return csvjson.toObject(data, options);
}

function mergeCFPs(currentCFPs, newCFPs, auth) {
    var existingEvents = currentCFPs.map((item) => {
        return item[0]; // Get names of all current CFPs
    });
    var newRows = [];
    for (var i = 0; i < newCFPs.length; i++) {
        if (existingEvents.indexOf(newCFPs[i]['Name']) == -1 && newCFPs[i]['Name'] != '[in short] We expect all participants') {
            var newRow = config.columnsMap.map((col) => {
                return col ? newCFPs[i][col] : '';
            });
            newRows.push(newRow);
        }
    }
    append(newRows, auth);
}
function append(newRows, auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    var request = {
        spreadsheetId: config.sheetID,
        range: config.sheetRange,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: newRows
        },
    };
    sheets.spreadsheets.values.append(request, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }
    });
    logAdded(newRows);
}

function logAdded(newRows) {
    console.log(newRows.length + ' events added');
    if (newRows.length) {
        for (var i = 0; i < newRows.length; i++) {
            console.log(newRows[i][0]);
        }
    }
}