import inquirer from 'inquirer';
import departmentObj from './departments.js';
import employeesObj from './employees.js';
import pHelper from '../helpers/promise.js'

//async function to pull department information for params and add role to db
async function sequentialQueriesAdd(sql) {
    try {
        const deptList = await departmentObj.viewDept();
        const params = await askRole(deptList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'role': 'added' }];
    } catch (error) {
        console.log(error);
    }
}

//function to ask user for relevant role info
const askRole = async (deptList) => {
    //push all department names into list to be presented in questions
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
    //find department id for selected department, and update response id
    for (let i = 0; i < deptList.length; i++) {
        if (deptList[i].department === response.department_id) {
            response.department_id = deptList[i].id;
            break;
        }
    }
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.title);
    respList.push(response.salary);
    respList.push(response.department_id);
    return respList;
}

//async function to pull role and employee information for params and update employee role after
async function sequentialQueriesUpdate(sql) {
    try {
        const roleList = await rolesObj.viewRoles();
        const employeeList = await employeesObj.viewEmployees();
        const params = await updateRoleQ(roleList, employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'role': 'updated' }];
    } catch (error) {
        console.log(error);
    }
}

const updateRoleQ = async (roleList, employeeList) => {
    //push all role names and employee names to lists to be presented in the questionaire
    let rlist = [];
    for (let i = 0; i < roleList.length; i++) {
        rlist.push(roleList[i].title);
    }
    let elist = [];
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name + ' ' + employeeList[i].last_name;
        elist.push(fullName);
    }
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Which employee's role do you want to update?",
            choices: elist
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What should their role be?',
            choices: rlist
        }

    ]);
    //find role id and manager id for the role and managers selected
    //update the response properties accordingly
    for (let i = 0; i < roleList.length; i++) {
        if (roleList[i].title === response.role_id) {
            response.role_id = roleList[i].id;
            break;
        }
    }
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name + ' ' + employeeList[i].last_name;
        if (fullName === response.employee_id) {
            response.employee_id = employeeList[i].id;
            break;
        }
    }
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.role_id);
    respList.push(response.employee_id);
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
        return pHelper.viewSeqQuery(sql);
    },
    addRoles: function () {
        const sql = `INSERT INTO role (role.title, role.salary, role.department_id) VALUES (?,?,?)`;
        return sequentialQueriesAdd(sql);
    },
    updateRole: function () {
        const sql = `UPDATE employee SET employee.role_id = ? WHERE id = ?`;
        return sequentialQueriesUpdate(sql);
    },
    deleteRole: function () {
        return;
    }

};

export default rolesObj;