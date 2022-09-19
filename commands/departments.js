import db from '../dbConnect.js';
import inquirer from 'inquirer';


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

async function sequentialQueriesView(sql) {
    try {
        const rows = await viewDPromise(sql);  
        return rows;
    } catch (error) {
        console.log(error);
    }
}

let addDPromise = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log('ERROR: Not able to find the requested information.');
                return reject(error);
            }
            return resolve(result);
        });
    });
};

async function sequentialQueriesAdd(sql, params) {
    try {
        const params = await askDepartment();
        const rows = await addDPromise(sql, params); 
        //give message for when message it is added 
        return [{'department': 'added'}];
    } catch (error) {
        console.log(error);
    }
}

const askDepartment = async () => {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]);
    return response.department;     
}

const departmentObj = {
    viewDept: function () {
        const sql = `SELECT id, name AS department FROM department`;
        return sequentialQueriesView(sql);
    },
    addDept: function() {
        const sql = `INSERT INTO department (department.name) VALUES (?)`;
            return sequentialQueriesAdd(sql);
        }    
    }

export default departmentObj;
