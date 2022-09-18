const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../dbConnect.js');

function viewDept() {
    const sql = `SELECT id, name AS department FROM department`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log('ERROR: Not able to find the requested information.');
            return;
        }
        console.log(result);
        // var values = [
        //     ['max', 20],
        //     ['joe', 30]
        // ];
        // console.table(['name', 'age'], values);
    });
    return;
};




module.exports = viewDept();