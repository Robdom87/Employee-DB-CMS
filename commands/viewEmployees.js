import db from '../dbConnect.js';

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
    }
};

export default employeesObj;