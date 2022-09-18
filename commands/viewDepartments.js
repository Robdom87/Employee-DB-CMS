// import cTable from 'console.table';
import db from '../dbConnect.js';

let viewDPromise = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (error, result) => {
            if (error) {
                console.log('ERROR: Not able to find the requested information.');
                return reject(error);
            }
            return resolve(result);
        });
    });
};

async function sequentialQueries(sql) {
    try {
        const rows = await viewDPromise(sql);  
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const departmentObj = {
    viewDept: function () {
        const sql = `SELECT id, name AS department FROM department`;
        let result = sequentialQueries(sql);
        return result;
    }
};

export default departmentObj;
