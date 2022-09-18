const inquirer = require('inquirer');
const viewDept = require('./commands/viewDepartments.js');
const viewRoles = require('./commands/viewRoles');
const viewEmployees = require('./commands/viewEmployees');
const addRole = require('./commands/addRole');
const addDept = require('./commands/addDepartment');
const addEmployee = require('./commands/addEmployee');
const updateRole = require('./commands/updateEmpRole');

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
};

//function to ask user for command and do request accordingly
function navigateUser() {
    commandPrompt()
        .then((response) => {
            switch (response.command) {
                case 'view all departments':
                    viewDept();
                case 'view all roles':
                    viewRoles();
                case 'view all employees':
                    viewEmployees();
                case 'add a department':
                    addDept();
                case 'add a role':
                    addRole();
                case 'add an employee':
                    addEmployee();
                case 'update an employee role':
                    updateRole();
                case 'quit':
                    console.log('Till next time!');
                    return;
            }
            navigateUser();
        });
};

function start() {
    console.log("\nWelcome to Employee Tracker!\n");
    navigateUser();
    return;
};

start();