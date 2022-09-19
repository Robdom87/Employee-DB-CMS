import db from '../dbConnect.js';
import inquirer from 'inquirer';
import departmentObj from './departments.js';

let viewRPromise = (sql) => {
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
        const rows = await viewRPromise(sql);  
        return rows;
    } catch (error) {
        console.log(error);
    }
}

let addRPromise = (sql, params) => {
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
        const deptList = await departmentObj.viewDept();
        const params = await askRole(deptList);
        const rows = await addRPromise(sql, params); 
        //give message for when message it is added 
        return [{'role': 'added'}];
    } catch (error) {
        console.log(error);
    }
}

const askRole = async (deptList) => {
    console.log(deptList);
    let list = [];
    for (let i = 0; i < deptList.length; i++) {
        list.push(deptList[i].department);
    }
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the role salary?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What is the name of the department?',
            choices: list
        }
    ]);
    
    for (let i = 0; i < deptList.length; i++) {
        if(deptList[i].department === response.department_id){
            response.department_id = deptList[i].id;
            break;
        }
    }
    let respList = [];
    respList.push(response.title);
    respList.push(response.salary);
    respList.push(response.department_id);
    return respList;     
}

const rolesObj = {
    viewRoles: function () {
        const sql = 
        `SELECT role.id, role.title, department.name AS department, role.salary
        FROM role 
        RIGHT JOIN department
        ON department.id = role.department_id
        ORDER BY role.id`;
        return sequentialQueries(sql);
    },
    addRoles: function() {
        const sql = `INSERT INTO role (role.title, role.salary, role.department_id) VALUES (?,?,?)`;
            return sequentialQueriesAdd(sql);
        }    
};

export default rolesObj;