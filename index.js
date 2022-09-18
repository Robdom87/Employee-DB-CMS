import inquirer from 'inquirer';
import cTable from 'console.table';
import departmentObj from './commands/viewDepartments.js';
import rolesObj from './commands/viewRoles.js';
import employeesObj from './commands/viewEmployees.js';
// import addRole from './commands/addRole.js';
// import addDept from './commands/addDepartment.js';
// import addEmployee from './commands/addEmployee.js';
// import updateRole from './commands/updateEmpRole.js';

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
            addDept;
            break;
        case 'add a role':
            addRole;
            break;
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