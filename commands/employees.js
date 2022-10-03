import inquirer from 'inquirer';
import roleObj from './roles.js';
import pHelper from '../helpers/promise.js'

//async function to pull role and employee information for params and add employee to db after
async function sequentialQueriesAdd(sql) {
    try {
        const roleList = await roleObj.viewRoles();
        const employeeList = await employeesObj.viewEmployees();
        const params = await askEmployee(roleList, employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'employee': 'added' }];
    } catch (error) {
        console.log(error);
    }
}

//function to ask user for relevant employee info
const askEmployee = async (roleList, employeeList) => {
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
    //push none option for manager question
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
        if (fullName === response.manager_id) {
            response.manager_id = employeeList[i].id;
            break;
            //add null to property if none is selected
        } else if (response.manager_id === 'none') {
            response.manager_id = null;
            break;
        }
    }
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.first_name);
    respList.push(response.last_name);
    respList.push(response.role_id);
    respList.push(response.manager_id);
    return respList;
}

async function sequentialQueriesDeleteEmployee(sql) {
    try {
        const employeeList = await employeesObj.viewEmployees();
        const params = await deleteEmployeeQ(employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'employee': 'deleted' }];
    } catch (error) {
        console.log(error);
    }
}

const deleteEmployeeQ = async (employeeList) => {
    //push all employee names to a list to be presented in the questionaire
    let elist = [];
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name + ' ' + employeeList[i].last_name;
        elist.push(fullName);
    }
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'What employee should be deleted?',
            choices: elist
        }

    ]);
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name + ' ' + employeeList[i].last_name;
        if (fullName === response.employee_id) {
            response.employee_id = employeeList[i].id;
            break;
        }
    }
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.employee_id);
    return respList;
}

async function sequentialQueriesUpdateManager(viewSql, sql) {
    try {
        const employeeList = await pHelper.viewSeqQuery(viewSql);
        const params = await updateManagerQ(employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'manager': 'updated' }];
    } catch (error) {
        console.log(error);
    }
}

const updateManagerQ = async (employeeList) => {
    //push all employee names to lists to be presented in the questionaire
   
    let elist = [];
    for (let i = 0; i < employeeList.length; i++) {
        let fullName = employeeList[i].first_name + ' ' + employeeList[i].last_name;
        elist.push(fullName);
    }
    let mlist = [];
    for (let i = 0; i < employeeList.length; i++) {
        if( employeeList[i].manager !== null && !mlist.includes(employeeList[i].manager)) {
            mlist.push(employeeList[i].manager);
        }  
    }
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Select employee to update manager for:",
            choices: elist
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who should their manager be?',
            choices: mlist
        }

    ]);
    //find role id and manager id for the role and managers selected
    //update the response properties accordingly
    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].manager === response.manager_id) {
            response.manager_id = employeeList[i].manager_id;
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
    respList.push(response.manager_id);
    respList.push(response.employee_id);
    return respList;
}

async function sequentialQueriesViewManager(sql) {
    try {
        const employeeList = await employeesObj.viewEmployees();
        const params = await viewManagerQ(employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const viewManagerQ = async (employeeList) => {
    //push all employee names to lists to be presented in the questionaire
    let mlist = [];
    for (let i = 0; i < employeeList.length; i++) {
        if( employeeList[i].manager !== null && !mlist.includes(employeeList[i].manager)) {
            mlist.push(employeeList[i].manager);
        }  
    }
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_id',
            message: 'Please select a manager:',
            choices: mlist
        }

    ]);
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.manager_id);
    return respList;
}

async function sequentialQueriesViewDept(sql) {
    try {
        const employeeList = await employeesObj.viewEmployees();
        const params = await viewDeptQ(employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const viewDeptQ = async (employeeList) => {
    //push all employee names to lists to be presented in the questionaire
    let dlist = [];
    for (let i = 0; i < employeeList.length; i++) {
        if( employeeList[i].department !== null && !dlist.includes(employeeList[i].department)) {
            dlist.push(employeeList[i].department);
        }  
    }
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Please select a department:',
            choices: dlist
        }

    ]);
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.department_id);
    return respList;
}

async function sequentialQueriesViewDeptBudget(sql) {
    try {
        const employeeList = await employeesObj.viewEmployees();
        const params = await viewDeptQ(employeeList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return rows;
    } catch (error) {
        console.log(error);
    }
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
        return pHelper.viewSeqQuery(sql);
    },
    addEmployees: function () {
        const sql = `INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?,?,?,?)`;
        return sequentialQueriesAdd(sql);
    },
    //find employee update manager
    updateManager: function () {
        const viewSql = 
        `SELECT employee.id, employee.first_name, employee.last_name, 
        employee.manager_id, CONCAT(management.first_name,' ',management.last_name) as manager 
        FROM employee
        LEFT JOIN employee management
        ON employee.manager_id = management.id
        ORDER BY employee.id`;
        const sql = `UPDATE employee SET employee.manager_id = ? WHERE id = ?`;
        return sequentialQueriesUpdateManager(viewSql, sql);
    },
    //view all employees under one manager
    viewByManager: function () {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
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
        WHERE CONCAT(management.first_name,' ',management.last_name) = ?
        ORDER BY employee.id`;
        return sequentialQueriesViewManager(sql);
    },
    //view all employees under one department
    viewByDepartment: function () {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
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
        WHERE department.name = ?
        ORDER BY employee.id`;
        return sequentialQueriesViewDept(sql);
    },
    deleteEmployee: function () {
        const sql = 'DELETE FROM employee WHERE id = ?';
        return sequentialQueriesDeleteEmployee(sql);
    },
    viewBudgetDept: function () {
        const sql = 
        `SELECT department.name AS department, SUM(role.salary) AS budget  
        FROM role
        JOIN department
        ON department.id = role.department_id
        JOIN employee
        ON employee.role_id = role.id
        WHERE department.name = ?`;
        return sequentialQueriesViewDeptBudget(sql);
    }
};

export default employeesObj;