import inquirer from 'inquirer';
import cTable from 'console.table';
import departmentObj from './commands/departments.js';
import rolesObj from './commands/roles.js';
import employeesObj from './commands/employees.js';

//variable to ask navigating question
const commandPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'What would you like to do?',
            choices:
                [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'view employees by manager',
                    'view employees by department',
                    'view total utilized budget of a department',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'update employee manager',
                    'delete department',
                    'delete role',
                    'delete employee',
                    'quit'],
        }
    ]);
}

//direct the user to the correct function depending on their response
function commandNavigation(command) {
    switch (command) {
        case 'view all departments':
            return departmentObj.viewDept();
        case 'view all roles':
            return rolesObj.viewRoles();
        case 'view all employees':
            return employeesObj.viewEmployees();
        case 'add a department':
            return departmentObj.addDept();
        case 'add a role':
            return rolesObj.addRoles();
        case 'add an employee':
            return employeesObj.addEmployees();
        case 'update an employee role':
            return rolesObj.updateRole();
        case 'update employee manager':
            return employeesObj.updateManager();
        case  'view employees by manager':
            return employeesObj.viewByManager();
        case 'view employees by department':
            return employeesObj.viewByDepartment();
        case 'delete department':
            return departmentObj.deleteDept();
        case 'delete role':
            return rolesObj.deleteRole();
        case 'delete employee':
            return employeesObj.deleteEmployee();
        case 'view total utilized budget of a department':
            return employeesObj.viewBudgetDept();
        default:
            return;            
    }
};

//function to ask user for command and do request accordingly
function navigateUser() {
    commandPrompt()
        .then((response) => {
            return commandNavigation(response.command);
        })
        .then((data) => {
            if (!data) {
                //response for quit option
                console.log("Press CTRL + C to exit out of the program.");
            } else {
                console.log('\n');
                //format returned array to print out into table
                const table = cTable.getTable(data);
                console.table(table);
                navigateUser();
            }
            return;
        })
};


function start() {
    console.log("\nWelcome to Employee Tracker!\n");
    navigateUser();
    return;
}

start();