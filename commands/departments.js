import inquirer from 'inquirer';
import pHelper  from '../helpers/promise.js'

//async function to wait for user response and procceed with db query afterwards
async function sequentialQueriesAdd(sql, params) {
    try {
        const params = await askDepartment();
        const rows = await pHelper.promise(sql, params); 
        //give message for when message it is added 
        return [{'department': 'added'}];
    } catch (error) {
        console.log(error);
    }
}

//function to ask user for department name
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
        return pHelper.viewSeqQuery(sql);
    },
    addDept: function() {
        const sql = `INSERT INTO department (department.name) VALUES (?)`;
            return sequentialQueriesAdd(sql);
        }    
    }

export default departmentObj;
