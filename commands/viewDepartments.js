// const cTable = require('console.table');
import db from '../dbConnect.js';

const departmentObj = {
    viewDept: function () {
        console.log('view dept called.')
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

            // { id: 1, department: 'Sales' },
            // { id: 2, department: 'Production' },
            // { id: 3, department: 'Accounting' },
            // { id: 4, department: 'Human Resources' },
            // { id: 5, department: 'Customer Service' }
        });
        return;
    }
};



export default departmentObj;