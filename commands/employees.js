import db from '../dbConnect.js';
import inquirer from 'inquirer';
import roleObj from './roles.js';

let viewEPromise = (sql) => {
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
        const rows = await viewEPromise(sql);  
        return rows;
    } catch (error) {
        console.log(error);
    }
}

let addEPromise = (sql, params) => {
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

async function sequentialQueriesAdd(sql) {
    try {
        const roleList = await roleObj.viewRoles();
        const employeeList = await employeesObj.viewEmployees();
        const params = await askEmployee(roleList, employeeList);
        const rows = await addEPromise(sql, params); 
        //give message for when message it is added 
        return [{'employee': 'added'}];
    } catch (error) {
        console.log(error);
    }
}

const askEmployee = async (roleList, employeeList) => {
    let rlist = [];
    for (let i = 0; i < roleList.length; i++) {
        rlist.push(roleList[i].title);
    }
    let elist = [];
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name+' '+employeeList[i].last_name;
        elist.push(fullName);
    }
    elist.push('none');
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is their role?',
            choices: rlist
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is their manager?',
            choices: elist
        }
    ]);
    
    for (let i = 0; i < roleList.length; i++) {
        if(roleList[i].title === response.role_id){
            response.role_id = roleList[i].id;
            break;
        }
    }
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name+' '+employeeList[i].last_name;
        if(fullName === response.manager_id){
            response.manager_id = employeeList[i].id;
            break;
        } else if (response.manager_id === 'none') {
            response.manager_id = null;
            break;
        }
    }
    let respList = [];
    respList.push(response.first_name);
    respList.push(response.last_name);
    respList.push(response.role_id);
    respList.push(response.manager_id);
    return respList;     
}


const employeesObj = {
    viewEmployees: function () {
        const sql = 
        `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title AS title,
        role.salary AS salary,
        department.name AS department, 
        CONCAT(management.first_name,' ',management.last_name) as manager 
        FROM employee
        JOIN role
        ON employee.role_id = role.id
        JOIN department
        ON department.id = role.department_id
        LEFT JOIN employee management
        ON employee.manager_id = management.id
        ORDER BY employee.id`;
        return sequentialQueries(sql);
    },
    addEmployees: function() {
        const sql = `INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?,?,?,?)`;
            return sequentialQueriesAdd(sql);
        }    
};


//similar to role but add list of all employees for manager Q, and add list of all role names questionaire

export default employeesObj;