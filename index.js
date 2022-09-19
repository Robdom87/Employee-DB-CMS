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
                ['view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'quit'],
        }
    ]);
}

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
            addEmployee();
            break;
        case 'update an employee role':
            updateRole();
            break;
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
                console.log("Press CTRL + C to exit out of the program.");
            } else {
                console.log(data);
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