import db from '../dbConnect.js';

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

const rolesObj = {
    viewRoles: function () {
        const sql = 
        `SELECT role.id, role.title, department.name AS department, role.salary
        FROM role 
        RIGHT JOIN department
        ON department.id = role.department_id
        ORDER BY role.id`;
        return sequentialQueries(sql);
    }
};

export default rolesObj;